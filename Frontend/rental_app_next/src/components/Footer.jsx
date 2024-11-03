import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <>
        <section className="footer" id="footer">
            <div className="box-container">
                <div className="box">
                    <h3 className="font-semibold">our branches</h3>
                    
                    <Link href="#"> <i className="fas fa-map-marker-alt"></i> india </Link>
                    <Link href="#"> <i className="fas fa-map-marker-alt"></i> japan </Link>
                    <Link href="#"> <i className="fas fa-map-marker-alt"></i> france </Link>
                    <Link href="#"> <i className="fas fa-map-marker-alt"></i> russia </Link>
                    <Link href="#"> <i className="fas fa-map-marker-alt"></i> USA </Link>
                </div>

                <div className="box">
                    <h3 className="font-semibold">quick links</h3>
                    <Link href="index"> <i className="fas fa-arrow-right"></i> home </Link>
                    <Link href="vehicles"> <i className="fas fa-arrow-right"></i> vehicles </Link>
                    <Link href="services"> <i className="fas fa-arrow-right"></i> services </Link>
                    <Link href="#"> <i className="fas fa-arrow-right"></i> featured </Link>
                    <Link href="feedback"> <i className="fas fa-arrow-right"></i> reviews </Link>
                    <Link href="contact"> <i className="fas fa-arrow-right"></i> contact </Link>
                </div>

                <div className="box">
                    <h3 className="font-semibold">contact info</h3>
                    
                    <Link href="tel:+916376094539"><i className="fas fa-phone"></i> +91 6376094539 </Link>
                    <Link href="tel:+916376094539"> <i className="fas fa-phone"></i> +91 6376094539 </Link>
                    <Link href="mailto:rentalcars@gmail.com"><i className="fas fa-envelope"></i> rentalcars@gmail.com </Link>
                    <Link href="http://"><i className="fas fa-map-marker-alt"></i> Ahmedabad, india - 382480 </Link>
                </div>

                <div className="box">
                    <h3 className="font-semibold">contact info</h3>
                    <Link href="#"> <i className="fab fa-facebook-f"></i> facebook </Link>
                    <Link href="#"> <i className="fab fa-twitter"></i> twitter </Link>
                    <Link href="#"> <i className="fab fa-instagram"></i> instagram </Link>
                    <Link href="#"> <i className="fab fa-linkedin"></i> linkedin </Link>
                    <Link href="#"> <i className="fab fa-pinterest"></i> pinterest </Link>
                </div>

            </div>

            <div className="credit font-medium"> © 2024 rentalcars, Inc. All Rights Reserved </div>


            
        </section>
    </>
  )
}
