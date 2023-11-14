/* eslint-disable jsx-a11y/label-has-associated-control */
import React,{memo, useContext} from "react";
import {ReactComponent as Sun} from '../../../assets/img/Sun.svg'
import {ReactComponent as Moon} from '../../../assets/img/Moon.svg'
import '../../../assets/style/ThemeDarkMode.css'
// import useLocalStorage from "../../../utils/hooks/useLocalStorage";
import { Theme } from "../../../interfaces";
import { LocalStorageContext } from "../../../utils/context/LocalStorageContext";
// eslint-disable-next-line import/no-cycle

// export interface IThemeProps {
//     data?:StoredData | null;
//     setData?:(data: StoredData) => void
// }

const ThemeDarkMode: React.FC = () => {
    const root = document.querySelector('#root');
    const {data,setData} = useContext(LocalStorageContext)

    const {log} = console
    log('Theme-rerender')
    log(`data in Theme : ${data}`)


    if(data?.theme){
        setAttributeRoot({theme: data.theme})
    }

    const setLightMode = ():void => {
        setRootSetData({theme:'light'})
    }
    const setDarkMode = ():void => {
        setRootSetData({theme:'dark'})
    }
    const toggleTheme = (e):void => {
        if(e.target.checked){
            setDarkMode()
        } else setLightMode()
    }

    function setAttributeRoot(theme:Theme):void {
        if(theme.theme)
        root?.setAttribute('data-theme',theme.theme )
    }

    function setRootSetData(theme:Theme):void {
        if(root){
            setAttributeRoot(theme)
            setData({
                ...data,
                theme : theme.theme,
            })
        }
    }

    return (
        <div className="dark-mode">
            <input 
                type="checkbox" id="dark-mode-toggle" className="dark-mode-input" 
                onClick={e => toggleTheme(e)} 
                defaultChecked={data?.theme === 'dark'}
            />
            <label htmlFor="dark-mode-toggle" className="dark-mode-label">
                <Sun/>
                <Moon/>
            </label>
           
        </div>
    )
}

export default memo(ThemeDarkMode)