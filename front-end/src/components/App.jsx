import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Bar from './Bar';
import Home from './Home';
import './App.css';
import SingleList from './SingleList';

function App(){
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
        .get("/api/lists")
        .then(res => {
            setLists(res.data)
        })
    }, [lists])

    const addList = () =>{
        setIsLoading(true);
        axios
        .post("/api/lists", {})
        .then(res =>{
            setLists(prevLists => [...prevLists, res.data]);
            setIsLoading(false);
        })
        .catch(err => {
            setError("ERROR: " + err.message);
            setIsLoading(false);
        })
    }


    function editList (id, editedItem) {
        setIsLoading(true);
        axios
        .patch(`/api/lists/${id}`, editedItem)
        .then(res =>{
            setLists(prevLists => {
                let updated = prevLists.find(list => list._id === id);
                updated.title = res.data.title;
                return prevLists;
            });
            setIsLoading(false);
        })
        .catch(err => {
            setError("ERROR: " + err.message);
            setIsLoading(false);
        })
    }

    function deleteList(id) {
        setIsLoading(true);
        axios
        .delete(`/api/lists/${id}`)
        .then(() => {
            setLists(prevLists =>{
                return prevLists.filter(list => {
                    return list._id !== id;
                  });
            });
            setIsLoading(false);
        })
        .catch(err => {
            setError("ERROR: " + err.message);
            setIsLoading(false);
        })
    }

    const clearErr = () => setError(null);

    return (
        <BrowserRouter>
            <Bar lists={lists} addList={addList}/>
            <Switch>
                <Route path="/lists/:id" render={({match}) => 
                    <SingleList 
                        listId={match.params.id} 
                        editList={editList} 
                        deleteList={deleteList}
                    />}
                />
                <Route path="/" exact>
                    <Home 
                        lists={lists} 
                        isLoading={isLoading} 
                        error={error} 
                        clearErr={clearErr}/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;