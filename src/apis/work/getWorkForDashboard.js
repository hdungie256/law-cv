import axios from "axios";
import dayjs from "dayjs";
import getAllWork from "./getAllWork";

export async function checkDashboardForThisWork (workId) {
    const response = await axios.get(process.env.REACT_APP_API_URL + 'work/' + workId,
    { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })

    const work = response.data.data;

    var result = {needReply: null, needDTHL: null, needResult: null}

    if (work.status === "Hoàn thành"){
        return result;
    }

    const workNeedsReply = await needsReply(work);
    const workNeedsDTHL = await needsDTHL(work);
    const workNeedsResults = await needsResults(work);

    result = {needReply: workNeedsReply, needDTHL: workNeedsDTHL, needResult: workNeedsResults};

    return result;
}

const getWorkForDashboard = async () => {
    var dueRows = [];
    var pendingRows = [];
    var dueCards = [];

    try {
        const allWork = (await axios.get(process.env.REACT_APP_API_URL + 'work',
        { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })).data.list;
        
        for (let i of allWork) {
            if (i.status === "Hoàn thành"){
                continue;
            }
            const workNeedsReply = await needsReply(i)
            const workNeedsDTHL = await needsDTHL(i)
            const workNeedsResults = await needsResults(i)

            if (workNeedsReply){
                dueRows.push(workNeedsReply)
                }
            if (workNeedsDTHL){
                dueRows.push(workNeedsDTHL)
            }
            if (workNeedsResults){                
                pendingRows.push(workNeedsResults)
            }
        }
        dueCards = dueRows.filter(row => row.hasOwnProperty('daysLeft') && row.daysLeft <= 14);

        var data = { dueRows: dueRows, pendingRows: pendingRows, dueCards: dueCards }

        data = { dueRows: dueRows.sort((a, b) => {return a.daysLeft - b.daysLeft}), 
        pendingRows: pendingRows.sort((a, b) => {return  b.daysLeft - a.daysLeft;}), 
        dueCards: dueCards.sort((a, b) => {return a.daysLeft - b.daysLeft;}) }

        sessionStorage.setItem('dashboardData', JSON.stringify(data));

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export default getWorkForDashboard;

const createDueWorkRow = (workId, workVBBH, action, type, workName, customerName, daysLeft, deadline) => {
    return ({ workId, workVBBH, action, type, workName, customerName, daysLeft, deadline });
};

const needsReply = async (work) => {
    if (work.history && work.history.length !== 0) {
        if (work.history[work.history.length-1].action==='Thông báo thiếu sót' || work.history[work.history.length-1].action==='Thông báo từ chối'){
            const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + work.customerId,
            { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })).data.data
            const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
            const deadline = dayjs(work.history[work.history.length-1]?.date).add(3,'month')
            const daysLeft = deadline.diff(dayjs(), 'day')

            const row = createDueWorkRow(work._id, work.gcnId, 'Trả lời thông báo', work.type, work.name, customerName, daysLeft, deadline.format("DD/MM/YYYY"))
            return row
        }
    }
    return null
}

const needsDTHL = async (i) => {
    
    if (i.gcnId && i.gcnDate){
        if (i.type === 'Thẩm định nhãn hiệu') {
        const daysPast = Math.round(dayjs().diff(dayjs(i.paperSubmitDate), 'year', true))
        if (daysPast % 10 === 0){
            const deadline = dayjs(i.paperSubmitDate).add(daysPast, 'year')
            const daysLeft = deadline.diff(dayjs(), 'day');
            if (daysLeft >= 0){
                const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + i.customerId,
                { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })).data.data
                const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
                const work = createDueWorkRow(i._id, i.gcnId, 'Duy trì hiệu lực', i.type, i.name, customerName, daysLeft, deadline.format('DD/MM/YYYY'));
                return work
            }
        }
        } else if (i.type === 'Thẩm định KDCN') {
            const daysPast = Math.round(dayjs().diff(dayjs(i.paperSubmitDate), 'year', true))
            if (daysPast % 5 === 0){
                const deadline = dayjs(i.paperSubmitDate).add(daysPast, 'year')
                const daysLeft = deadline.diff(dayjs(), 'day');
                if (daysLeft >= 0){
                    const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + i.customerId,
                    { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })).data.data
                    const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
                    const work = createDueWorkRow(i._id, i.gcnId, 'Duy trì hiệu lực', i.type, i.name, customerName, daysLeft, deadline.format('DD/MM/YYYY'));

                    return work
                }
            }
        } else if (i.type === 'Thẩm định sáng chế' || i.type === 'Thẩm định GPHI') {
            const daysPast = Math.round(dayjs().diff(dayjs(i.gcnDate), 'year', true))
            const deadline = dayjs(i.gcnDate).add(daysPast, 'year')
            const daysLeft = deadline.diff(dayjs(), 'day');

            if (daysLeft >= 0){
                const worksWithSameVBBH = await getAllWork(i.gcnId)
                if ((worksWithSameVBBH.filter(item => item.workName === 'Duy trì hiệu lực năm thứ ' + daysPast).length === 0)){
                    const type = (i.type === 'Thẩm định sáng chế' ? 'Sáng chế' : 'GPHI')
                    const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + i.customerId,
                    { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })).data.data
                    const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
                    const work = createDueWorkRow(i._id, i.gcnId, 'Duy trì hiệu lực năm thứ ' + daysPast, i.type, i.name, customerName, daysLeft, deadline.format('DD/MM/YYYY'));
                    return work
                }
            }
        }
    }
    return null
}

const needsResults = async (work) => {
    if (work.status === 'Hoàn thành' || (work.type.includes("Thẩm định") && work.gcnId)){
        return null
    }

    var baseMonth;
    var workType;
    if (work.type === "Thẩm định nhãn hiệu"){
        baseMonth = 18
        workType = "ĐK nhãn hiệu"
    }
    else if (work.type === "Thẩm định KDCN"){
        baseMonth = 12
        workType = "ĐK KDCN"
    }
    else if (work.type === "Thẩm định sáng chế"){
        baseMonth = 24
        workType = "ĐK sáng chế"
    }
    else if (work.type === "Thẩm định GPHI"){
        baseMonth = 24
        workType = "ĐK GPHI"
    }
    else{
        baseMonth = 6
        workType = work.type
    }

    const diff = Math.round(dayjs().diff(dayjs(work.paperSubmitDate), 'month', true))
    var daysOver; 

    if (diff >= baseMonth){
        daysOver = Math.round(dayjs().diff(dayjs(work.paperSubmitDate), 'day', true))

        if (work.history.length === 0){
            const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + work.customerId,
            { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })).data.data
            const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
            const row = createDueWorkRow(work._id, work.gcnId, null,  workType, work.name, customerName, daysOver, dayjs(work.paperSubmitDate).format("DD/MM/YYYY"))
            return row
        }

        for (let i=0;i<work.history.length;i++){
            console.log(work.history[i])
            if (work.history[i].action?.includes("Quyết định") || work.history[i].action?.includes("Ngày")){
                return null
            }
        }

        const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + work.customerId,
        { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })).data.data
        const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
        const row = createDueWorkRow(work._id, work.gcnId, null, workType, work.name, customerName, daysOver, dayjs(work.paperSubmitDate).format("DD/MM/YYYY"))
        return row
    }

    return null;
}
