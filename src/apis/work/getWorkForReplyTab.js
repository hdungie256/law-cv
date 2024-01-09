import axios from "axios";
import dayjs from "dayjs";

const getWorkForReplyTab = async () => {
    const cards = []
    const allWork = (await axios.get(process.env.REACT_APP_API_URL + 'work')).data.list
    for (let i=0; i<allWork.length; i++){
        const sortedHistory = allWork[i].history.sort((a, b) => b.date - a.date)
        const latestAction = sortedHistory[0].action
        const latestDate = sortedHistory[0].date
        const dateDiff = Math.ceil(dayjs(sortedHistory[0].date).diff(dayjs())/ (1000 * 60 * 60 * 24))
        if (dateDiff<0){
            break
        }
        else{
            if (latestAction==="Thông báo thiếu sót"){
                const name = allWork[i].customerShortName ? allWork[i].customerShortName : allWork[i].customerName
                const card = createCardInfo( allWork[i]._id, name,allWork[i].type, "Trả lời thông báo thiếu sót", latestDate,dateDiff)
                cards.push(card)
            }

            else if (latestAction==="Thông báo từ chối"){
                const name = allWork[i].customerShortName ? allWork[i].customerShortName : allWork[i].customerName
                const card = createCardInfo( allWork[i]._id, name, allWork[i].type, "Trả lời thông báo từ chối",latestDate, dateDiff)
                cards.push(card)
            }
        }
    }
    const sortedCards = cards.sort((a, b) => a.due - b.due)
    console.log('sortedcards', sortedCards)
    return sortedCards
}

export default getWorkForReplyTab

const createCardInfo = (workId,name,type,action,deadline,due) => {
    return {workId,name,type,action,deadline,due}
}