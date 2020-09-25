import { discoverDevices } from '../../services/broadlink';
import { setIsBusy, setShowAlert } from '../layout/actionCreator';
import { GET_DEVICES, SET_SELECTED_DEVICE } from './actionType';

export const requestDevices = () => {
  return async dispatch => {
    dispatch(setIsBusy(true));
    await dispatch({
      type: GET_DEVICES,
      payload: discoverDevices(),
    })
      .then(data => {
        dispatch(setIsBusy(false));
        if (data.value.length > 0) {
          dispatch(
            setShowAlert(
              'success',
              `Discovered ${data.value.length} devices`,
              true
            )
          );
        } else {
          dispatch(setShowAlert('error', `Did not discover any devices`, true));
        }
      })
      .catch(() => {
        dispatch(setIsBusy(false));
      });
  };
};

export const setSelectedDevice = selectedDevice => {
  return async dispatch => {
    await dispatch({
      type: SET_SELECTED_DEVICE,
      payload: {
        selectedDevice,
      },
    });
  };
};
