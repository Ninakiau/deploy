import { useForm } from "react-hook-form";

import useAuth from "../../api/auth";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {Alertas,Spinner} from "../../index";

import { redirectLoginByRol } from "../../utils/DecodificarToken";

export default function Register() {

  const [error,setError]= useState({
    state:false,
    msg:''
  })

  const [loading,setLoading]=useState(false)

  const navigate = useNavigate();

  const {
    authRegistro
  } = useAuth();

  const {
      register,
      handleSubmit,
      formState: { errors },
      watch
    } = useForm();

    const onSubmit = handleSubmit(async (data)=> {

      const body = {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "email": data.email,
        "password": data.password,
        "role": data.role
      }

      try {
        setLoading(true)
        const rta = await authRegistro(body)
        const ruta = await redirectLoginByRol(rta)
        navigate(ruta)
      } catch (error) {
        setLoading(false)
        handleError(error)
        setTimeout(()=>{
          resetError()
        },3000)
      }
    })

    const handleError = (error) => {
      if(error.detail){
        if(error.detail.password){
          const rta = error.detail.password
          setError({
            state:true,
            msg:rta
          })
        }else{
          setError({
            state:true,
            msg:'algo salio mal,intentalo mas tarde'
          })
        }
      }else{
        setError({
          state:true,
          msg:error.message
        })
      }
    };

    const resetError =()=>{
      setError({
        state:false,
        msg:''
      })
    }

    return (
      <>
        <div className="p-3 max-w-2xl my-0 mx-auto">
          <Alertas err={error} size='md'>
            <form onSubmit={onSubmit} className="max-w-[70%] my-0 mx-auto" noValidate>
              <h1 className="text-3xl p-2 m-2 text-center">¡Bienvenido a nuestra comunidad!</h1>

              {/* Role */}
              <label htmlFor="role" className="block text-[20px] font-[600]">¿Cuál es tu rol?</label>
              <select 
                  defaultValue={''} 
                  id="role" 
                  className="px-[30px] w-full outline-none border-[1px] border-[#000D13] rounded-[10px] text-base h-10"
                  {...register("role", {
                    required: {
                      value: true,
                      message: "El Rol es requerido",
                    }
                  })}
                  >
                <option value={""} disabled="disabled">
                  Escoje uno
                </option>
                <option value={"STUDENT"}>Alumno</option>
                <option value={"TEACHER"}>Profesor</option>
              </select>

              {errors.role && (
                  <span className="block text-red-600 text-xs">
                    {errors.role.message}
                  </span>
                )}

              {/* Name */}
              <label className="block text-[20px] font-[600]" htmlFor="name">Nombre</label>
              <input 
                  className="py-[10px] px-[30px] w-full outline-none border-[1px] border-[#000D13] rounded-[10px] text-base h-10" 
                  id="name" 
                  type="text"
                  placeholder="Escribe tu nombre"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener al menos 2 caracteres"
                    },
                    maxLength: {
                      value: 30,
                      message: "El nombre debe tener como máximo 30 caracteres"
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]{2,30}$/,
                      message: "El nombre solo debe contener letras",
                    },
                  })}
                />
                {errors.firstName && (
                  <span className="block text-red-600 text-xs">
                    {errors.firstName.message}
                  </span>
                )}

              {/* LastName */}
              <label className="block text-[20px] font-[600]" htmlFor="lastName">Apellido</label>
              <input 
                  className="py-[10px] px-[30px] w-full outline-none border-[1px] border-[#000D13] rounded-[10px] text-base h-10" 
                  id="lastName" 
                  type="text"
                  placeholder="Escribe tus apellidos"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "El apellido es requerido",
                    },
                    minLength: {
                      value: 2,
                      message: "El apellido debe tener al menos 2 caracteres"
                    },
                    maxLength: {
                      value: 30,
                      message: "El apellido debe tener como máximo 30 caracteres"
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]{2,30}$/,
                      message: "El apellido solo debe contener letras",
                    }
                  })}
                />
                {errors.lastName && (
                  <span className="block text-red-600 text-xs">
                    {errors.lastName.message}
                  </span>
                )}

              {/* Email */}
              <label className="block text-[20px] font-[600]" htmlFor="email">Email</label>
              <input 
                className="py-[10px] px-[30px] w-full outline-none border-[1px] border-[#000D13] rounded-[10px] text-base h-10" 
                id="email" 
                type="email"
                placeholder="Escribe tu email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Correo es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Correo no válido. Debe ser formato 'ejemplo@mail.com'",
                  },
                })}
              />
              {errors.email && (
                <span className="block text-red-600 text-xs">
                  {errors.email.message}
                </span>
              )}


              {/* Password */}
              <label className="block text-[20px] font-[600]" htmlFor="password">Contraseña</label>
              <input 
                  className="py-[10px] px-[30px] w-full outline-none border-[1px] border-[#000D13] rounded-[10px] text-base h-10" 
                  id="password" 
                  type="password"
                  placeholder="Escribe tu contraseña"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La contraseña es requerida",
                    },
                    minLength: {
                      value: 8,
                      message: "Debe contener al menos 8 caracteres"
                    },
                    maxLength: {
                      value: 15,
                      message: "Debe tener como maximo 15 caracteres"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
                      message: "Debe contener almenos una mayuscula, minuscula, número, caract. especial '$@$!%*?&'",
                    },
                  })}
                />
                {errors.password && (
                  <span className="block text-red-600 text-xs">
                    {errors.password.message}
                  </span>
                )}


              {/* Confirm Password */}
              <label className="block text-[20px] font-[600]" htmlFor="confirmPassword">Repite tu contraseña</label>
              <input 
                  className="py-[10px] px-[30px] w-full outline-none border-[1px] border-[#000D13] rounded-[10px] text-base h-10" 
                  id="confirmPassword" 
                  type="password"
                  placeholder="Escribe tu contraseña"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirmar contraseña es requerida",
                    },
                    validate: value => value == watch
                    ('password')  || 'Las contraseñas no coinciden'
                  })}
              />

                {errors.confirmPassword && (
                  <span className="block text-red-600 text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}

              <button 
                className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {
                  loading ? <Spinner/> : <span>Enviar</span>
                }
              </button>
            </form>
          </Alertas>
        </div>
      </>
    );
}
