import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'STARTUPS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'STARTUPS_FORM_FIND_STARTED',
      });

      axios.get(`/startups/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'STARTUPS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'STARTUPS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/startups'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'STARTUPS_FORM_CREATE_STARTED',
      });

      axios.post('/startups', { data: values }).then((res) => {
        dispatch({
          type: 'STARTUPS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Startups created' });
        dispatch(push('/admin/startups'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'STARTUPS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'STARTUPS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/startups/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'STARTUPS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Startups updated' });
        dispatch(push('/admin/startups'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Startups update error' });
      dispatch({
        type: 'STARTUPS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
