/*
MIDIのInput, Outputデバイスを設定するためのコンポーネント

Dropdownは↓からコピペした
https://mui.com/base-ui/react-menu/
*/

import React, {useEffect} from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import Button from "@mui/material/Button";
import IMidiIO from "../../interfaces/IMidiIO";
import "./TrainConfig.css";

interface TrainConfigProps {
    midiIO: IMidiIO
}

export default function TrainConfig({ midiIO }: TrainConfigProps) {
    useEffect(() => {
        midiIO.setInput("JUNO-DS");
    }, [midiIO.availableInputDevices]);
    
    useEffect(() => {
        midiIO.setOutput("JUNO-DS");
    }, [midiIO.availableOutputDevices]);

    //Input用メニュー
    function _handleInputMenuItemClick(device: string) {
        return () => {
            midiIO.setInput(device);
        }
    }
    const inputMenuItems = midiIO.availableInputDevices.map((device, i) => {
        return (
            <StyledMenuItem key={i.toString()} onClick={_handleInputMenuItemClick(device)}>
                {device}
            </StyledMenuItem>
        );
    });
    
    //Output用メニュー
    function _handleOutputMenuItemClick(device: string) {
        return () => {
            midiIO.setOutput(device);
        }
    }
    const outputMenuItems = midiIO.availableOutputDevices.map((device, i) => {
        return (
            <StyledMenuItem key={i.toString()} onClick={_handleOutputMenuItemClick(device)}>
                {device}
            </StyledMenuItem>
        );
    });

    function _handleUpdateDevicesBtnClick() {
        midiIO.updateAvailableDevices();
    }

    return (
        <div className="train-config">
            <h1>Train Config</h1>
            <Dropdown>
                <h3>Input</h3>
                <Button variant='outlined'>{midiIO.currentInputDevice}</Button>
                <Menu slots={{ listbox: StyledListbox }}>
                    {inputMenuItems}
                </Menu>
            </Dropdown>
            <Dropdown>
                <h3>Output</h3>
                <Button variant='outlined'>{midiIO.currentOutputDevice}</Button>
                <Menu slots={{ listbox: StyledListbox }}>
                    {outputMenuItems}
                </Menu>
            </Dropdown>
            <div className="update-devices-btn-container">
                <Button variant='contained' onClick={ _handleUpdateDevicesBtnClick }> デバイス一覧更新</Button>
            </div>
        </div>
    );
}

// ↓この辺はデザインの関係。意味不
const blue = {
    50: '#F0F7FF',
    100: '#DAECFF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 16px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;
  `,
);

const StyledMenuItem = styled(MenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);
