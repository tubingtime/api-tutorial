import React, {Fragment, useState} from "react";

const InputTodo = () => {
    const [description, setDescription] = useState("");
    const [listId, setListId] = useState("");

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const body = { description } // we use brackets around a string to make it an object/json
            console.log(body);
            const response = await fetch(`http://localhost:5000/lists/${listId}`)
        } catch (err) {
            
        }

    }

    return (
        <Fragment>
            <h1 className="text-center"> Input New Todo Item</h1>
            <form className="flex mt-5 justify-center" onSubmit={onSubmitForm}>
                <div>
                    <label className="">
                        List ID
                    </label>
                    <input
                        type="text"
                        className="border rounded mx-5"
                        value={listId}
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setListId(e.target.value)}
                    />
                </div>
                
                <div>
                    <label>
                        Description
                    </label>
                    <input
                        type="text"
                        className="border rounded mx-5"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    />
                </div>
                <button className="bg-blue-400 hover:bg-blue-800 text-white font-bold rounded">Add</button>
            </form>
        </Fragment>
    );
};


export default InputTodo;