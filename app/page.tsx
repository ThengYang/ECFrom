'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState<string>('6 AM');

  const handleItemClicked = (event: any) => {


    let doc = document.getElementById("scroll-div") as HTMLElement

    console.log("Width", doc.clientWidth)
    console.log("Max Scroll Left", doc.scrollWidth - doc.clientWidth)
    console.log("target", event.currentTarget.offsetLeft)

    if (doc) {
      console.log(event.currentTarget.offsetLeft)
      console.log(Math.round(event.currentTarget.offsetLeft / 129))

      doc.scrollLeft = Math.floor((event.currentTarget.offsetLeft / 90) - 1) * (doc.scrollWidth - doc.clientWidth) / Math.floor(8 - ((doc.clientWidth - 90) / 50)) //170//112//57//Math.max(0, (event.currentTarget.offsetLeft - doc.offsetWidth) + 175);
    }

    setActive(event.currentTarget.value)
  }

  const handleNext = () => {
    let doc = document.getElementById("scroll-div") as HTMLElement
    const active_int = parseInt(active)
    let new_active = active
    if (active_int === 12) {
      active.includes("AM") ? new_active = "3 AM" : new_active = "3 PM"
    }
    else if (active_int === 9) {
      new_active = active.includes("AM") ? (active_int + 3).toString() + " PM" : (active_int + 3).toString() + " AM"
    }
    else {
      new_active = (active_int + 3).toString() + ' ' + active.slice(2)
    }

    const time_slot_doc = document.getElementById(new_active + '-time-slot-elem') as HTMLElement;
    doc.scrollLeft = Math.max(0, (time_slot_doc.offsetLeft - doc.offsetWidth) + 150);
    setActive(new_active);
  }


  const handlePrev = () => {
    let doc = document.getElementById("scroll-div") as HTMLElement
    const active_int = parseInt(active)
    let new_active = active
    if (active_int === 3) {
      active.includes("AM") ? new_active = "12 AM" : new_active = "12 PM"
    }
    else if (active_int === 12) {
      new_active = active.includes("AM") ? (active_int - 3).toString() + " PM" : (active_int - 3).toString() + " AM"
    }
    else {
      new_active = (active_int - 3).toString() + ' ' + active.slice(2)
    }

    const time_slot_doc = document.getElementById(new_active + '-time-slot-elem') as HTMLElement;
    doc.scrollLeft = Math.max(0, (time_slot_doc.offsetLeft - doc.offsetWidth) + 200);
    setActive(new_active);
  }

  return (
    <main style={{ height: '100vh' }}>
      <h1>
        Hello World
      </h1>

      <div style={{ position: 'relative', maxWidth: 640, margin: 'auto' }}>

        <button
          disabled={active === '12 AM'}
          onClick={handlePrev}
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '2%'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
        </button>
        <span style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          background: '#d8ddde',
          width: '20px',
          height: '100%',
          zIndex: 1,
          "-webkit-mask-image": 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          textAlign: 'center',
          marginTop: '1em',
          width: '80%',
          margin: 'auto',
          overflowY: 'hidden',
          overflowX: 'auto',
          borderBottom: '1px solid black',
          paddingBottom: '5px',
          position: 'relative',
          maxHeight: '60px'
        }}
          id="scroll-div"
        >
          <button style={{
            backgroundColor: '#d8ddde',
            borderRadius: '5px',
            minWidth: '15px',
            margin: '0 2px',
            height: '35px',
            marginTop: '25px',
            position: 'relative'
          }} />
          {Array.from(['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'], time =>

            <button id={time + '-time-slot-elem'} style={{
              border: active === time ? '2px solid #246191' : '1px solid gray',
              backgroundColor: '#e5e5e5',
              borderRadius: '5px',
              minWidth: active === time ? '90px' : '50px',
              margin: '0 2px',
              fontSize: active === time ? '18px' : '12px',
              height: active === time ? '' : '35px',
              marginTop: active === time ? '0px' : '10px',
              position: 'relative'
            }}
              onClick={handleItemClicked}
              value={time}
            >
              <p
                style={{
                  backgroundColor: '#ff9900',
                  borderRadius: '4px 4px 0px 0px',
                  paddingTop: active === time ? '3px' : '0px',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                }}
              >
                {active === time ? <strong>KP: 4 </strong> : '4'}
              </p>
              <p
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  paddingTop: '2px',

                }}
              >
                {active === time ? parseInt(time) + ":00 " + time.slice(-2) : time}
              </p>

            </button>

          )}
          <button style={{
            backgroundColor: '#d8ddde',
            borderRadius: '5px',
            minWidth: '15px',
            margin: '0 2px',
            height: '35px',
            marginTop: '25px',
            position: 'relative'
          }} />
        </div>
        <span style={{
          position: 'absolute',
          top: 0,
          right: '10%',
          background: '#d8ddde',
          width: '20px',
          height: '100%',
          zIndex: 1,
          "-webkit-mask-image": 'linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
        }} />

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '2%'
          }}
          disabled={active === '9 PM'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </button>

      </div>
    </main>
  );
}
