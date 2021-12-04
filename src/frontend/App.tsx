import * as React from 'react';
import { useSelector } from 'react-redux';
import { CHANGE_CONFIG } from '../types/ipcTypes';
import { useAppDispatch } from './app/hooks';

export default function App() {

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    window.api.send(CHANGE_CONFIG.REQUEST, {userName: 'test', userRmail: 'test'});
  }, []);

  return (
    <div>
      Test
    </div>
  )
}