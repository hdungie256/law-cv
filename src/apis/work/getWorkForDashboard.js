import axios from "axios";
import dayjs from "dayjs";

const getWorkForDashboard = async () => {
    var dueRows = [];
    var pendingRows = [];
    var dueCards = [];

    try {
        const allWork = (await axios.get(process.env.REACT_APP_API_URL + 'work')).data.list;

        for (let i of allWork) {
            if (i.type === 'Thẩm định nhãn hiệu') {
                const daysPast = Math.round(dayjs().diff(dayjs(i.paperSubmitDate), 'year', true))
                if (daysPast % 10 === 0){
                    const deadline = dayjs(i.paperSubmitDate).add(daysPast, 'year')
                    const daysLeft = deadline.diff(dayjs(), 'day');
                    if (daysLeft >= 0){
                        const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + i.customerId)).data.data
                        const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
                        const work = createDueWorkRow(i._id, 'Duy trì hiệu lực', 'Nhãn hiệu', i.name, customerName, daysLeft, deadline.format('DD/MM/YYYY'));
                        dueRows.push(work);
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
                        dueRows.push(work);
                    }
                }
            } else if (i.type === 'Thẩm định sáng chế' || i.type === 'Thẩm định GPHI') {
                const daysPast = Math.round(dayjs().diff(dayjs(i.paperSubmitDate), 'year', true))
                const deadline = dayjs(i.paperSubmitDate).add(daysPast, 'year')
                const daysLeft = deadline.diff(dayjs(), 'day');

                if (daysLeft >= 0){
                    const type = (i.type === 'Thẩm định sáng chế' ? 'Sáng chế' : 'GPHI')
                    const customer = (await axios.get(process.env.REACT_APP_API_URL + 'customers/' + i.customerId)).data.data
                    const customerName = (customer.customerShortName ? customer.customerShortName : customer.customerName)
                    const work = createDueWorkRow(i._id, 'Duy trì hiệu lực năm thứ ' + daysPast, type, i.name, customerName, daysLeft, deadline.format('DD/MM/YYYY'));
                    dueRows.push(work);
                }
            }
        }
        dueCards = dueRows.filter(row => row.daysLeft && row.daysLeft <= 14)
        return ({ dueRows: dueRows, pendingRows: pendingRows, dueCards: dueCards });

    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error appropriately, e.g., return an error object or throw an exception.
    }
};

export default getWorkForDashboard;

const createDueWorkRow = (workId, action, type, workName, customerName, daysLeft, deadline) => {
    return ({ workId, action, type, workName, customerName, daysLeft, deadline });
};
