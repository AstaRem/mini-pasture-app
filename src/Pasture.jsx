import { useState, useEffect } from "react";


const STORAGE_KEY = 'pasture-animals';

const loadFromStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveToStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


export default function Pasture(){

    const [animals, setAnimals] = useState([]);
    const [type, setType] = useState('avis');
    const [weight, setWeight] = useState('');
    const [editId, setEditId] = useState(null);

    //load animals from local storage on page load

    useEffect(() => {
        setAnimals(loadFromStorage())
    }, [])

    //save to local storage whenever animals change
    useEffect(() => {
        saveToStorage(animals);
    }, [animals]);

    const handleAdd = () => {
        if(!weight || isNaN(weight)) return;
        const newAnimal = {
            id: Date.now(),
            type,
            weight: parseFloat(weight)
        };
        setAnimals([...animals, newAnimal]);
        setWeight('');
    }

    const handleDelete = (id) => {
        setAnimals(animals.filter((a) => a.id !== id));
    };

    const startEdit = (animal) => {
        setEditId(animal.id);
        setWeight(animal.weight);
        setType(animal.type);
    }

    const handleUpdate = () => {
        setAnimals(
            animals.map((a) => a.id === editId ? {...a, weight: parseFloat(weight)} : a)
        )

        setEditId(null);
        setWeight('');
    };

    return(
        <div>
            <h2>Ganykla</h2>
            <div>
                <select value={type} onChange={(e)=>setType(e.target.value)}>
                    <option value="avis">Avis</option>
                    <option value="antis">Antis</option>
                    <option value="antilopė">Antilopė</option>
                </select>

                <input
                    type="number"
                    placeholder="Svoris, kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                
                ></input>
                <button onClick={editId ? handleUpdate : handleAdd}>
                    {editId ? 'Atnaujinti' : 'Pridėti'}
                </button>

                <ul>
                    {animals.map(animal => (
                     <li key={animal.id}>{animal.type} -  {animal.weight} kg            
                        <button onClick={() => startEdit(animal)}>✏️</button>
                        <button onClick={() => handleDelete(animal.id)}>❌</button>
                        </li>  
                    ))}
                </ul>
            </div>
        </div>


    )

}