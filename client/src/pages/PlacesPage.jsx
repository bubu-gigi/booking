import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";


export default function PlacesPage() {
    const {action} = useParams();
    const [title,setTile] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header,description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
        setAddedPhotos(prev => {
            return [...prev, filename]
        });
        setPhotoLink('');
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your place, should be short and cathcy')}
                        <input type="text" value={title} onChange={ev => setTile(ev.target.value)} placeholder="title, for example my lovely app"/>
                        {preInput('Address', 'Address to this place')}                        
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">more = better</p>
                        <div className="flex gap-2">
                            <input value={photoLink} 
                                onChange={ev => setPhotoLink(ev.target.value)} 
                                type="text" 
                                placeholder={'Add using a link ...jpg'}/>
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => {
                                <div>
                                    {link}
                                </div>
                            })}
                            <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 mt-4 text-2xl text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        <h2 className="text-2xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">description of the place</p>
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
                        <h2 className="text-2xl mt-4">Perks</h2>
                        <p className="text-gray-500 text-sm">select all the perks of your place</p>
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>
                        <h2 className="text-2xl mt-4">Extra info</h2>
                        <p className="text-gray-500 text-sm">house rulse, extra</p>
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        <h2 className="text-2xl mt-4">Chech in&out times</h2>
                        <p className="text-gray-500 text-sm">add check in and check out times, remember to have some time window for cleaning the rooms between guests</p>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1 ">Check in time</h3>
                                <input type="text" 
                                       value={checkIn} 
                                       onChange={ev => setCheckIn(ev.target.value)} 
                                       placeholder="14:00"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1 ">Check out time</h3>
                                <input type="text" 
                                       value={checkOut} 
                                       onChange={ev => setCheckOut(ev.target.value)} 
                                       placeholder="11:00"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1 ">Max number of guests</h3>
                                <input type="number" 
                                       value={maxGuests} 
                                       onChange={ev => setMaxGuests(ev.target.value)} 
                                       placeholder="es: 3"/>
                            </div>
                        </div>
                        <div>
                            <button className="primary mt-4">Save</button>
                        </div>
                    </form>
                </div>
            )} 
        </div>
    );
}