"use client";
import React, {useState} from 'react'

export const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch("http://127.0.0.1:8000/contactus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                name: name,
                email:email,
                phone:phone,
                message:message
             }),
        });

        if (response.ok) {
            alert("Form submitted successfully!");
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
        } else {
            alert("Failed to submit form.");
        }
    };


  return (
    <>
        <section className="contact  mb-[5rem]" id="contact">
            <h1  className="pb-6 text-[3rem] md:text-[4rem] flex font-bold text-gray-800 justify-center">contact us
                {/* {% comment %} <span>contact us</span> {% endcomment %} */}
            </h1>

            <div className="row !gap-[4rem] sm:mx-[3rem]">
                <iframe className="map min-h-[40rem]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883734.5405313424!2d71.10875065591415!3d22.69997852215749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1648971540844!5m2!1sen!2sin"
                    allowFullScreen="" loading="lazy"></iframe>

                <form onSubmit={handleSubmit}>
                    {/* {% csrf_token %} */}
                    <h3 className="text-[3rem] md:text-[4rem] flex font-bold text-gray-800 justify-center">get in touch</h3>
                    <input type="text" placeholder="your name" className="box" 
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="your email" className="box" 
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                    <input type="tel" placeholder="your mobile no" className="box" 
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} required />
                    <textarea placeholder="your message" className="box" cols="30" rows="10" 
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} required></textarea>
                    <input type="submit" value="send message" className="btn" />
                </form>
            </div>
        </section>
    
    </>
  )
}
