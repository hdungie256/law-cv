import axios from "axios";
import dayjs from "dayjs";
import getAllWork from "./getAllWork";

const getWorkForDashboard = async () => {
    var dueRows = [];
    var pendingRows = [];
    var dueCards = [];

    try {
        const allWork = (await axios.get(process.env.REACT_APP_API_URL + 'work')).data.list;
        
        for (let i of allWork) {
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
        return ({ dueRows: dueRows, pendingRows: pendingRows, dueCards: dueCards });

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
            const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + work.customerId)).data.data
            const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
            const deadline = dayjs(work.history[-1].date).add(3,'month')
            const daysLeft = deadline.diff(dayjs(), 'day')

            const row = createDueWorkRow(work._id, work.gcnId, 'Trả lời thông báo', work.type, work.name, customerName, daysLeft, deadline)
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
                        const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + i.customerId)).data.data
                        const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
                        const work = createDueWorkRow(i._id, 'Duy trì hiệu lực', 'Nhãn hiệu', i.name, customerName, daysLeft, deadline.format('DD/MM/YYYY'));
                        return work
                    }
                }
                } else if (i.type === 'Thẩm định KDCN') {
                    const daysPast = Math.round(dayjs().diff(dayjs(i.paperSubmitDate), 'year', true))
                    if (daysPast % 5 === 0){
                        const deadline = dayjs(i.paperSubmitDate).add(daysPast, 'year')
                        const daysLeft = deadline.diff(dayjs(), 'day');
                        if (daysLeft >= 0){
                            const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + i.customerId)).data.data
                            const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
                            const work = createDueWorkRow(i._id, 'Duy trì hiệu lực', 'Nhãn hiệu', i.name, customerName, daysLeft, deadline.format('DD/MM/YYYY'));

                            return work
                        }
                    }
                } else if (i.type === 'Thẩm định sáng chế' || i.type === 'Thẩm định GPHI') {
                    console.log(i)
                    const daysPast = Math.round(dayjs().diff(dayjs(i.gcnDate), 'year', true))
                    const deadline = dayjs(i.gcnDate).add(daysPast, 'year')
                    const daysLeft = deadline.diff(dayjs(), 'day');

                    if (daysLeft >= 0){
                        const worksWithSameVBBH = await getAllWork(i.gcnId)
                        if ((worksWithSameVBBH.filter(item => item.workName === 'Duy trì hiệu lực năm thứ ' + daysPast).length === 0)){
                            const type = (i.type === 'Thẩm định sáng chế' ? 'Sáng chế' : 'GPHI')
                            const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + i.customerId)).data.data
                            const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
                            const work = createDueWorkRow(i._id, i.gcnId, 'Duy trì hiệu lực năm thứ ' + daysPast, type, i.name, customerName, daysLeft, deadline.format('DD/MM/YYYY'));
                            return work
                        }
                    }
                }
            }
    return null
}

const needsResults = (work) => {
    return true
}
