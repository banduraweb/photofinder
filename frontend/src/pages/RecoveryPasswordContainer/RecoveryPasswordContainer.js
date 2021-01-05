import React, { useCallback, useState, useEffect } from 'react';
import { RecoveryPassword } from './RecoveryPassword';
import { useHistory, useParams } from 'react-router-dom';
import routing from '../../routing/routing';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST, SUCCESS } from '../../constants/constants';
import JWTDecode from 'jwt-decode';
import Notification from '../../services/notification.service';
import { recoveryPasswordSelectors } from '../../modules/RecoveryPassword/RecoveryPasswordSelectors';
import {
  pushRecoveryPassword,
  saveFieldsRecoveryPassword,
} from '../../modules/RecoveryPassword/RecoveryPasswordActions';
export const RecoveryPasswordContainer = () => {
  const [errorId, setErrorId] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const checkTokenType = () => {
    try {
      const { app } = JWTDecode(id);
      if (!app) {
        setErrorId(true);
      }
    } catch (e) {
      setErrorId(true);
      Notification.error('Link is not valid');
    }
  };
  useEffect(() => {
    checkTokenType();
  }, [id]);
  const { errors, input, status } = useSelector(
    recoveryPasswordSelectors.selectRecoveryState
  );

  useEffect(() => {
    if (status === SUCCESS) {
      history.push(routing().login);
    }
  }, [status]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(pushRecoveryPassword({ token: id }));
    },
    [dispatch, input]
  );

  const handleChange = useCallback(
    ({ target }) => {
      dispatch(saveFieldsRecoveryPassword(target));
    },
    [dispatch]
  );
  const goHome = () => {
    history.push(routing().forgotpassword);
  };

  const loading = status === REQUEST;

  return (
    <RecoveryPassword
      goHome={goHome}
      errorId={errorId}
      errors={errors}
      input={input}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
