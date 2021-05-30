import logo from './logo.svg';
import './App.css';

import React, { Component, useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import { Database } from "@textile/threaddb"

import Button from 'react-bootstrap/Button';

import Nyan from "react-nyan";

 const schema = ({
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "description": "A simple person schema",
  "type": "object",
  "properties": {
    "_id": {
      "description": "Field to contain ulid-based instance id",
      "type": "string",
    },
    "scan": {
      "description": "Name of the person",
      "type": "string",
    },
    "score": {
      "type": "integer",
      "minimum": 0,
    },
    "date": {
      "type": "integer",
      "minimum": 1,
    },
  },
  "required": ["_id", 'scan', 'score', 'date'],
});

const cheerio = require('cheerio');
const request = require('request');

const App = () => {

    const [scan, setScan] = useState('')
    const [challenge, setChallenge] = useState('')
    const [isScanned, setIsScanned] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const [score, setScore] = useState(0)

    useEffect(() => {
      let timer;

      // if(!isPlaying){
        timer = setTimeout(() => {
            setIsPlaying(false)
            console.log(localStorage.getItem('high'))
            console.log()
            setScore(localStorage.getItem('high'))
            // TODO: 
            // reasign score to scanned wood
            // const found = await client.find('🧶', "Person", {})
            // await found.update(score)
            // invite collaborators for feedback & input
            console.log(score)
          }, 2022*10)
        // }
        // else {

        // }
      return () => clearTimeout(timer);
    }, []);


   
    const handleScan = async (data) => {

    // const res = await Person.insert({ scan: 'Moskalyk', date: Date.now() })
    // console.log(res)

      if (data) {
        const db = await new Database("demo", { name: "Person", schema }).open(1); // Versioned dbs
        const Being = db.collection("Person")
        console.log(data)
        setScan(data)
        const res = await Being.insert({ scan: data, score: 0, date: Date.now() })
        console.log(res)

        setIsScanned(true)
      }
    }

    const handleError = (err) => {
      console.error(err)
    }

    const handleClick = () => {
      console.log('click')
    }

    const handleClickWood = () => {
      setChallenge('🪵')
    }

    const handleClickPunk = () => {
      
    }

    return (
      <div>
        <div style={{textAlign: 'center'}}>
          {/* brrr it's cold, need some fire*/}
          <br/>
          <br/>
          <br/>
          <h1>Zζ arbor games</h1>
        </div>
        {
          !isScanned ? 
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '40%', margin: 'auto'}}
          />
          : 
            (
              <div style={{textAlign: 'center', margin: 'auto'}} >
                choose prize for challenge
                <br/>
                {challenge == '' ? 
                  
                  <>
                    <Button className="button" onClick={handleClickWood}>🪵</Button>
                    <Button className="button" onClick={handleClickPunk}>🎨</Button>
                  </>
                  :
                    <>
                      <p>{challenge}</p>
                      <br/>
                      <br/>
                      <br/>
                      <p>begin exercise with keys "command+ctrl+right+left"</p>
                    </>
                }
                
                {
                    isPlaying 
                      ? 
                        <Nyan hotkey="command+ctrl+right+left" /> 
                        : 
                        <h2 style={{background: 'blue', color: 'white', padding: '10px'}}> high score: {score} </h2> }
              </div>
            )
          }
        <p style={{textAlign: 'center'}}>{scan}</p>
      </div>
    )
}

export default App;
