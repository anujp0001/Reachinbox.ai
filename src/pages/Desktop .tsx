import React, { useEffect, useState, } from 'react'
import Slidebar from '../components/Slidebar'
import Theme from '../components/Theme';
import Workspace from '../components/Workspace';
// import { useLocation } from 'react-router';
// import { jwtDecode } from "jwt-decode";
import { ChevronDown } from 'lucide-react';
import { deleteMailResponse, getMailMasseges } from '../actions/actions';
import InboxEmailCard from '../components/InboxEmailCard';
import InboxHeader from '../components/InboxHeader';
import LoadingPage from '../components/LoadingPage';
import SearchBar from '../components/SearchBar';
import UserDetails from '../components/UserDetails';
import ReplySection from '../components/ReplySection';
import { Modal } from './Modal';
import axios from 'axios';

const Desktop = () => {
    const [currColor, setCurrColor] = useState<Boolean>(true);
    const [data , setData ]= useState([]);
    const [singleMail , setSingleMail ]= useState<any>({});
    const [render , setRender]= useState<Boolean>(false)

    // const location = useLocation();
    const [ showEmailDesktop,setShowEmailDesktop]= useState(0)

    let token:string =localStorage.getItem("reachinbox-auth") || takeToken();
    console.log(token)
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = (): void => {
      setIsModalOpen(true);
    };
  
    const closeModal = (): void => {
      setIsModalOpen(false);
    };

    useEffect(() => {
        const interval = setInterval(async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
              "https://hiring.reachinbox.xyz/api/v1/onebox/list",
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            setData(res.data.data);
            // setLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }, 2500);
      
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
      }, []);
  
    function takeToken(): string {
        try {
            const token = localStorage.getItem("reachinbox-auth");
            console.log(token)
            return token ? JSON.parse(token) : ""; 
        } catch (e) {
            console.log("Error:", e);
            return ""; 
        }
    }

    useEffect(()=>{},[singleMail,showEmailDesktop,isModalOpen])
   
    const handleChangeEmail = (id: number) => {
        getMailMasseges(id).then(messages =>{
            setSingleMail(messages);
        }) 
        .catch(error => console.error('Error:', error));
    }


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if(event.key === "d" || event.key === "D")
          {
            openModal();
          }
        };
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [isModalOpen]);

    const handleChange=(index:number)=> setShowEmailDesktop(index);

    const deleteEmail =()=>{
        const id:number = singleMail[0].threadId
        deleteMailResponse(id).then((res)=>{
            alert(`The ${id} has been Deleted Successful`);
            setRender(!render)
            closeModal()
        }).catch(err => alert("Error Please try again"))
        
    }


    let firstName = localStorage.getItem('reachinbox-auth-firstname');
    firstName = firstName ? JSON.parse(firstName):''
    let lastName = localStorage.getItem('reachinbox-auth-lastname') 
    lastName = lastName ? JSON.parse(lastName):''
    const username = firstName ? (firstName[0] + (lastName ? lastName[0] : '')) : '';

    return (
        <>
        <div className={`w-full h-full m-auto max-w-[1440px] ${currColor ? "bg-black" : "bg-white"} ${currColor ? "text-white" : "text-black"} h-10 flex`}>
            <div className='w-[56px] h-screen '>
                <Slidebar currColor={currColor} username = {username} showEmailDesktop={showEmailDesktop} handleChange={handleChange} />
            </div>
            <div  className='w-full max-w-[1383]'>
                <div className={` h-[64px] flex justify-between py-4 pl-8 ${currColor ? "bg-[#1F1F1F]" : "bg-white"} border ${currColor ? "border-gray-700":"border-gray-300" } `}>
                    <p className={`w-full text-left text-xl ${currColor ? "text-white-900" : "text-black-900"} `}>Onebox</p>
                    <div className='w-[210px] h-8 mr-5 flex justify-center items-center gap-5'>
                      <Theme currColor={currColor} onClick={()=> setCurrColor(!currColor)} />
                      <Workspace/>
                    </div>
                </div>
                {
                showEmailDesktop !== 5? <LoadingPage/>
                : <div className={`flex border ${currColor ? "border-gray-700" : "border-gray-300"} `}>
                    <div className='w-[275px] ml-5  pr-3'>
                        <div className='flex justify-between mt-4 items-center'>
                           <InboxHeader currColor={currColor}/>
                        </div>
                        <p className='text-left  text-[14px] mt-2.5'>25/25 <span className=' text-[#7F7F7F]'>Inboxes selected</span></p>
                        <div className=' mt-2 h-11 '>
                           <SearchBar currColor ={currColor}/>
                        </div>
                        <div className='flex justify-between  text-[14px]'>
                            <div className='flex items-center gap-2 '>
                                <p className={`text-blue-500 w-8 h-7 pt-0.5 rounded-2xl ${ currColor? 'bg-[#25262B]':'bg-[#e1e7ee]' }`}>26</p>
                                <p>New Replies</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p>Newest</p>
                                <ChevronDown/>
                            </div>
                        </div>
                        <hr className='mt-2.5'/>
                        <div className=' text-left'>
                            {
                                data?.length >0 && data.map((item:any) =>{
                                    return <div key={item.id}>
                                        <InboxEmailCard currColor = {currColor} {...item} handleChangeEmail={handleChangeEmail}/>
                                        <hr />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <ReplySection currColor={currColor} singleMail = {singleMail}/>
                    <UserDetails currColor={currColor}/>
                </div>
                }
            </div>
            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className='w-[440px] h-[240px] text-white '>
                        <div className=' h-full '>
                            <h1 className='text-[24px] font-bold mt-8'>Are you Sure ?</h1>
                            <p className='mt-8 text-[#E8E8E8]'>Your selected email will be deleted.</p>
                            <div className='mt-8 flex justify-center gap-5 '>
                                <button className='w-[120px] h-12 bg-[#25262B] ' onClick={closeModal}>Cancel</button>
                                <button className='w-[140px] h-12 bg-[#FA5252] ' onClick={deleteEmail}>Delete</button>
                            </div>
                        </div>
                    </div>
                </Modal>

            </div>
        </div>
        </>
    );
}

export default Desktop 
