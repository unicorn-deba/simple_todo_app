import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import UpdateIcon from '@mui/icons-material/Update';
import note_logo from './note_logo.jpg';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';

const To_do_list = () => {

    // const image = "photos/note1.jpg";
    // const image = "photos/note_logo.jpg"
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [iseditItem, setIsEditItem] = useState(null);
    const [noValue, setNoValue] = useState(false);

    const defaultContainerStyle={
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const addItem = () => {

        if (!inputData) {
            setNoValue(true)
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((element) => {
                    if (element.id === iseditItem) {
                        return { ...element, name: inputData }
                    }
                    return element;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        }
        else {

            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData("");

        }

    }


    const deleteItem = (index) => {
        const updatedItems = items.filter((element) => {
            return index != element.id;
        })
        setItems(updatedItems);
    }

    //remove all
    const deleteAll = () => {
        setItems([]);
    }

    useEffect(()=>{
        let timeOut;
        if(noValue){
            timeOut = setTimeout(()=>setNoValue(false), 1500)
        }
        return () => clearTimeout(timeOut)
    },[noValue])

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });
        setToggleSubmit(false);
        setInputData(newEditItem.name);

        setIsEditItem(id);

    }

    return (
        <>
            <div className='main_div'>
                <div className='image_div'>
                    <img src={note_logo} alt='eror..' />
                </div>
                <div className='paragraph'>
                    <p>Add Your List Here 🗒️</p>
                </div>
                <div>
                    <div className='add_list_div'>
                        <div style={{...defaultContainerStyle}}>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNWBNbdIZdkOzwe76Y6LQjdvow3Dxcj2aYP728z0zrT-b_FYaKIMsGpCIMNTPmJI-bi8o&usqp=CAU' alt='loading...' />
                            <input placeholder='Add Items....'
                                value={inputData}
                                onChange={(event) => {
                                    setInputData(event.target.value.trim());
                                }}
                            />
                            {toggleSubmit ? <Tooltip title='Add'>
                                <button className='add_icon' style={defaultContainerStyle} onClick={addItem}><AddIcon /></button>
                            </Tooltip> : <Tooltip title='Update'>
                                <button className='add_icon' style={defaultContainerStyle} onClick={addItem}><SaveIcon /></button>
                            </Tooltip>}
                            {noValue && <div className='no_value_notification'>* Please enter a valid value</div>}
                        </div>

                    </div>
                </div>

                <div className='show_items'>

                    {items.map((element, index) => {
                        return (
                            <>
                                {/* every value needs a unique value */}
                                <div className='each_item' key={element.id}>
                                    <div className='items'>
                                        <h2> ➡️ {element.name}</h2>
                                        <div className='edit_del_div'>
                                            <Tooltip title='Edit'>
                                                <button className='edit_icon' onClick={() => editItem(element.id)}><EditIcon /></button>
                                            </Tooltip>
                                            <Tooltip title='Delete'>
                                                <button className='delete_icon' onClick={() => deleteItem(element.id)}><DeleteIcon /></button>
                                            </Tooltip>
                                        </div>

                                    </div>
                                </div>

                            </>
                        )

                    })}



                </div>
                {items?.length>0 && <div className='check_list'>
                    <button className='remove_all_button' onClick={deleteAll}>Delete All</button>
                </div>}
            </div>
        </>
    )
}

export default To_do_list;