import React from 'react';
import ListBox from './ListBox';

function Home(props) {

    return (
        <div>
            {props.isLoading ? <h1>Loading...</h1> :  <h1>Welcome!</h1>}
            {props.error && <p onClick={props.clearErr}>{props.error} </p>}
            {props.lists.map(list => <ListBox list={list} key={list._id}/>)}
        </div>
    );
} 

export default Home;