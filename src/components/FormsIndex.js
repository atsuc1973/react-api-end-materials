import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const FormsIndex = () => {

    const [materials, setMaterials] = useState([])

    const [grade, setGrade] = useState('')
    const [color, setColor] = useState('')
    const [statusMaterial, setStatusMaterial] = useState('')
    const [amount, setAmount] = useState('')
    const [staffId, setStaffId] = useState('')

    useEffect(() => {
        axios.get('http://192.168.4.246/Apimaterials/materails/aip.json')
       .then(res => {
           setMaterials(res.data.arrMaterials)
       })
    },[])
    console.log(materials)

    const handleChangeGrade = (e) => {
        setGrade(e.target.value)
    }
    const handleChangeColor = (e) => {
        setColor(e.target.value)
    }
    const handleChangeStatusMaterial = (e) => {
        setStatusMaterial(e.target.value)
    }
    const handleChangeAmount = (e) => {
        setAmount(e.target.value)
    }
    const handleChangeStaffId = (e) => {
        setStaffId(e.target.value)
    }
    console.log(grade)
    const createNewUser = () => {
        axios.post('https://192.168.4.246/Apimaterials/apimaterails/api.json', {

            grade: grade,
            color: color,
            status_material: statusMaterial,
            amount: amount,
            staff_id: staffId
            
        })
        .then(response => {
        setMaterials([...materials, response.data])
        })
        .catch(error => {
        console.log(error)
        })
    }

    return (
        <div>
            <p>グレード<input value={grade} onChange={handleChangeGrade}/></p><br />
            <p>カラー<input value={color} onChange={handleChangeColor}/></p><br />
            <p>端材状態<input value={statusMaterial} onChange={handleChangeStatusMaterial}/></p><br />
            <p>数量<input value={amount} onChange={handleChangeAmount}/></p><br />
            <p>スタッフID<input value={staffId} onChange={handleChangeStaffId}/></p><br />

            <button onClick={createNewUser}>作成</button>
            <ul>
                {materials.map((material, index) => (
                <li key={index}>{material.grade_color}</li>
                ))}
            </ul>
        </div>
    )
}

export default FormsIndex