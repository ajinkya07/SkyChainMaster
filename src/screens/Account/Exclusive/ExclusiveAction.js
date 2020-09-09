import {
    EXCLUSIVE_DATA,
    EXCLUSIVE_DATA_SUCCESS,
    EXCLUSIVE_DATA_ERROR,
    EXCLUSIVE_DATA_RESET_REDUCER,

  } from "@redux/types";
  
  import { strings } from '@values/strings'
  import axios from 'axios'
  import { urls } from '@api/urls'
  
  const header = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }
  
  export function showLoadingIndicator(type) {  
    return {
      type: type
    };
  }
  
  
  export function onSuccess(data, type) {
    return {
      data,
      type: type,
    };
  }
  
  export function onFailure(error, type) {
    return {
      type: type,
      error
    };
  }
  
  export function getExclusiveList(data) {
  console.log("getExclusiveList",data);
  
    return dispatch => {
      dispatch(showLoadingIndicator(EXCLUSIVE_DATA));
  
      axios.post(urls.Exclusive.url, data, header).then(response => {
          console.warn("getExclusiveList response", response.data);
          if (response.data.ack ==='1') {
            dispatch(
              onSuccess(response.data, EXCLUSIVE_DATA_SUCCESS)
            )
          }
          else {
            dispatch(
              onFailure(response.data.msg, EXCLUSIVE_DATA_ERROR)
            )
          }
        })
        .catch(function (error) {  
          dispatch(
            onFailure(strings.serverFailedMsg, EXCLUSIVE_DATA_ERROR)
          );
        });
    }
  }
  

  
  export function getOrderHistoryDetails(data) {
    console.warn("getOrderHistoryDetails",data);
    
      return dispatch => {
        dispatch(showLoadingIndicator(ORDER_HISTORY_DETAILS_DATA));
    
        axios.post(urls.OrderHistoryDetail.url, data, header).then(response => {
            console.warn("getOrderHistoryDetails", response.data);
            if (response.data.ack ==='1') {
              dispatch(
                onSuccess(response.data, ORDER_HISTORY_DETAILS_DATA_SUCCESS)
              )
            }
            else {
              dispatch(
                onFailure(response.data.msg, ORDER_HISTORY_DETAILS_DATA_ERROR)
              )
            }
          })
          .catch(function (error) {
            console.log("getHomePageData ERROR", error);
    
            dispatch(
              onFailure(strings.serverFailedMsg, ORDER_HISTORY_DETAILS_DATA_ERROR)
            );
          });
      }
    }

    
    
  export function reOrderProduct(data) {
    console.warn("reOrderProduct",data);
    
      return dispatch => {
        dispatch(showLoadingIndicator(REORDER_DATA));
    
        axios.post(urls.ReOrder.url, data, header).then(response => {
            console.warn("reOrderProduct", response.data);
            if (response.data.ack ==='1') {
              dispatch(
                onSuccess(response.data, REORDER_DATA_SUCCESS)
              )
            }
            else {
              dispatch(
                onFailure(response.data.msg, REORDER_DATA_ERROR)
              )
            }
          })
          .catch(function (error) {
            console.log("getHomePageData ERROR", error);
    
            dispatch(
              onFailure(strings.serverFailedMsg, REORDER_DATA_ERROR)
            );
          });
      }
    }
