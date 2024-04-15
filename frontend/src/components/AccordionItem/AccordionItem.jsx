import svgCheck from './svgCheck.svg'
import datos from '../Course/data.json'
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const AccordionItem = ({title, content, idModule,idCurso}) => {

  const location = useLocation();

  const data = datos[0].modules;

  const [isOpen, setIsOpen] = useState(false);

  const [moduleSelect, setModuleSelect ] = useState(null); 
  
  const handleModuleSelect = () => {
    setModuleSelect(idModule)
  }

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div onClick={()=> {handleModuleSelect}} className="w-full  bg-white cursor-pointer">
      <div className="p-[5px]" onClick={toggleAccordion}>
        {title}
      </div>
      {isOpen && (
        <div className="flex flex-col list-none text-xl">
          {content?.map(cont =>
              <NavLink to={`/dashboard/curso/${idCurso}/${idModule}/${cont.id}`}>
                <div className='flex items-center hover:bg-[#f1f1f1] h-20'>
                    <div className="h-full w-12 flex justify-center items-center">
                      <img className="h-6" src={svgCheck} alt="icono de check" />
                    </div>
                    <li className='text-[#2d2f31]'>{cont.title}</li>
                </div>
              </NavLink>
            )}
        </div>
      )}
    </div>

     {/*  {onClick, estilos, titleModule, shortDescription, viewTime} */}
      {/* <div className={`flex w-full  bg-white cursor-pointer hover:bg-[#f1f1f1] ${estilos}`} onClick={onClick}>
        <div className="h-full w-12 flex justify-center items-center">
          <img className="h-6" src={svgCheck} alt="icono de check" />
        </div>

        <div className="flex flex-col justify-center p-[5px]">
          <h2 className="text-base font-bold text-[#2d2f31]">{titleModule}</h2>
          <p className="font-normal text-[#2d2f31] text-base">{shortDescription}</p>
          <label className="text-[#6b6b6b] text-base">{viewTime} min</label>
        </div>
      </div>
 */}
    </>
  );
}

export default function AccordionMenu({ items }) {
  const ID = items.id
  return (
    <div>
      {items.modules?.map((item, index) => (
        <NavLink to={`/dashboard/curso/${ID}/${item.id}`}>
          <AccordionItem key={index} title={item.title} content={item.contents} idModule={item.id} idCurso={ID}/>
        </NavLink>
      ))}
    </div>
  );
};