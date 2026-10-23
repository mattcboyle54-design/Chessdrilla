import actionTypes from "./actionTypes"

export const openPromotion = ({piece,rank,file,x,y}) => {
    return {
        type: actionTypes.PROMOTION_OPEN,
        payload : {piece,rank,file,x,y},
    }
}


export const closePopup = () => {
    return {
        type: actionTypes.PROMOTION_CLOSE
    }
}