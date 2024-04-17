import { useEffect,useState } from "react"

import useCourse from "../../api/course"
import useCurso from "../../hooks/useCurso"
import useProfesor from "../../api/profesor"

import SubirArchivo from "../SubirArchivo/SubirArchivo"

function DatosCourse({
    setStep
}){
    const [categorias,setCategorias]=useState([])
    const [fileImagen,setFileImagen]=useState(null)
    const [urlImg,setUrlImg]=useState(null)
    const [data,setData]=useState({
        'title':'',
        'description':'',
        'categoryId':'',
        'image':''
    })

    const {
        setInformacionCurso
    }=useCurso()

    const {
        getCategorias
    }=useCourse()

    const onChangeForm = (e)=>{
        e.preventDefault()
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        setInformacionCurso(data)
        setStep(prev => prev+1 )
        window.location.hash = '#modulo';
    }

    useEffect(()=>{
        const categorias = async ()=>{
            try {
                const rta = await getCategorias()
                setCategorias(rta)
            } catch (error) {
                console.log(error)
            }
        }
        categorias()
    },[])

    useEffect(()=>{
        if(urlImg){
            setData({
                ...data,
                'image':urlImg
            })
        }
    },[fileImagen])

    return (
        <div className="w-[90%] mx-auto border shadow rounded-md py-5 px-5">
            <h1 className="text-2xl font-bold italic text-center">Crea tu curso</h1>
            <form
                onSubmit={handleSubmit}
                className="py-2 flex flex-col gap-2"
            >
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold italic">Titulo del curso</label>
                    <input
                        onChange={onChangeForm}
                        name="title" 
                        type="text" 
                        className="border rounded shadow py-1 px-5 outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold italic">Descripción del curso</label>
                    <textarea
                        onChange={onChangeForm}
                        name="description" 
                        type="text" 
                        className="border rounded shadow py-1 px-5 outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold italic">Categoria</label>
                    <select
                        onChange={onChangeForm}
                        name="categoryId" 
                        className="outline-none border py-1 px-5"
                    >
                        <option value=''>Elegir categoria</option>
                        {
                            categorias?.map(item =>{
                                return <option key={item.id}  value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <SubirArchivo
                        setUrlImg={setUrlImg}
                        callback={setFileImagen}
                        stateImage={fileImagen}
                        label={'Imagen del curso'}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    CREAR MODULOS
                </button>
            </form>
        </div>
    )
}

export default DatosCourse
