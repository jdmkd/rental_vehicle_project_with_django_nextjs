"use client"
import React, { useState } from 'react'
import './Feedback.module.css'

const Feedback = () => {
    const [hoveredRating, setHoveredRating] = useState(0);

    const [rating, setRating] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{

            const response = await fetch("http://127.0.0.1:8000/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name:name,
                    email:email,
                    comments:comment,
                    ratings:rating
                 }),
            });
    
            if (response.ok) {
                alert("Form submitted successfully!");
                setRating("");
                setName("");
                setEmail("");
                setComment("");
    
            } else {
                alert("Failed to submit form.");
            }
        }
        catch(e){
            alert("Exception :: ",e);
        }
    };
  return (
    <>
    {/* {% if messages %}
    <section className="popup_message">
        {% comment %} <button className="show-modal">Show Modal</button>
        <span className="overlay"></span> {% endcomment %}
        {% for message in messages %} 
            <div className="modal_box">
                </button>
                <i className="fa-regular fa-circle-check"></i>
                <h3>{{ message }}</h3>
                <div className="buttons">
                    <button className="close_btn">Ok, Close</button>
                </div>
            </div>
        {% endfor %}            
    </section>
    {% endif %} */}


    <section className="mt-[10rem] mb-[3rem]flex flex-row relative items-center justify-center ">
        <div className="px-[.6rem] py-[2rem] rounded-lg border border-solid border-black/30 bg-card text-card-foreground shadow-md shadow-gray-200 w-full max-w-xl mx-auto" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-4xl normal-case font-semibold leading-none tracking-tight">Send us your feedback</h3>
            <p className="text-lg normal-case text-muted-foreground">We value your input and want to hear your thoughts.</p>
            </div>
            <div className="p-6">
                <form className="max-w-lg mx-auto" onSubmit={handleSubmit} role="form" method="post" id="reused_form">      
                    {/* {% csrf_token %} */}
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Your name</label>
                        <input type="name" name="name" id="name" className="flex normal-case h-[4rem] w-full rounded-md border border-solid border-gray-950/40 px-3 py-4 text-[1.3rem] bg-transparent focus:outline-offset-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter your name"
                         value={name}
                        onChange={(e) => setName(e.target.value)} required />
                         
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Your email</label>
                        <input type="email" name="email" id="email" className="flex normal-case h-[4rem] w-full rounded-md border border-solid  border-gray-950/40 px-3 py-4 text-[1.3rem] bg-transparent focus:outline-offset-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50" placeholder="abc@gmail.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                        
                        
                    </div>
                    <div className="mb-5">
                        <label htmlFor="feedbackmessage" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="feedbackmessage" name="comments" rows="4" className="flex normal-case h-[4rem] w-full rounded-md border border-solid  border-gray-950/40 px-3 py-4 text-[1.3rem] bg-transparent focus:outline-offset-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]" placeholder="Leave a comment..." 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} required >
                        
                        </textarea>
                    </div>
                    {/* <div className="mb-5 flex flex-col justify-center items-center gap-[.5rem]">
                        <label htmlFor="star-rating" className="text-lg">How do you rate your overall experience?</label>
                        <span className="star-rating inline-block m-[.5rem] w-[175px] h-[35px] relative overflow-hidden whitespace-nowrap bg-contain 
                                bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjREREREREIiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=')]
                                // bg-contain
                                "
                                id="star-rating" name="rating" required>
                            <input type="radio" className="rating relative m-0 p-0 z-3 opacity-0 inline-block w-[20%] h-[100%]" name="rating1" value="1" />
                            <i className="opacity-0 absolute left-0 right-0 h-[100%] w-[20%] z-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=')]"></i>
                            <input type="radio" className="rating relative m-0 p-0 z-3 opacity-0 inline-block w-[20%] h-[100%]" name="rating1" value="2" />
                            <i className="opacity-0 absolute left-0 right-0 h-[100%] w-[20%] z-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=')]"></i>
                            <input type="radio" className="rating relative m-0 p-0 z-3 opacity-0 inline-block w-[20%] h-[100%]" name="rating1" value="3" />
                            <i className="opacity-0 absolute left-0 right-0 h-[100%] w-[20%] z-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=')]"></i>
                            <input type="radio" className="rating relative m-0 p-0 z-3 opacity-0 inline-block w-[20%] h-[100%]" name="rating1" value="4" />
                            <i className="opacity-0 absolute left-0 right-0 h-[100%] w-[20%] z-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=')]"></i>
                            <input type="radio" className="rating relative m-0 p-0 z-3 opacity-0 inline-block w-[20%] h-[100%]" name="rating1" value="5" />
                            <i className="opacity-0 absolute left-0 right-0 h-[100%] w-[20%] z-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=')]"></i>
                        </span>
                    </div> */}
                    <div className="m-[2rem] flex flex-col justify-center items-center gap-[.5rem]">
                        <label htmlFor="star-rating" className="text-lg">
                            How do you rate your overall experience?
                        </label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <label
                                    key={star}
                                    className="cursor-pointer relative"
                                    onMouseEnter={() => setHoveredRating(star)} // Set hovered rating on mouse enter
                                    onMouseLeave={() => setHoveredRating(0)} // Reset hovered rating on mouse leave
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="sr-only"
                                        value={rating}
                                        onClick={() => setRating(star)}
                                    />
                                    <svg
                                        className={`w-16 h-16 fill-gray-300 transition-colors duration-300
                                            ${rating >= star || hoveredRating >= star ? 'fill-yellow-400' : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <polygon points="10,1.5 12.5,7.5 19,8 14,12.5 15.5,19 10,15.5 4.5,19 6,12.5 1,8 7.5,7.5" />
                                    </svg>
                                </label>
                            ))}
                        </div>
                    </div>
                    

        

                    <button type="submit" className="h-[4rem] w-full px-5 py-2.5 text-center text-white bg-green-700/90 hover:bg-green-700 hover:shadow-sm focus:ring-2 focus:outline-none focus:ring-green-600/80 font-medium rounded-lg text-[1.4rem]">
                    Submit Feedback</button>
                </form>
            </div>
            <div id="success_message" className="hidden w-[100%] h-[100%] "> <h3>Posted your feedback successfully!</h3> </div>
            <div id="error_message" className="hidden w-[100%] h-[100%]"> <h3>Error</h3> Sorry there was an error sending your form. </div>
        </div>
    </section>
    
    
    </>
  )
}

export default Feedback