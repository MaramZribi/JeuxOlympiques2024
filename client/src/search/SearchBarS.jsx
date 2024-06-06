import React, { useState } from "react";
import "./searchBar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function SearchBarS() {
    const navigate = useNavigate();
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [sports, setSports] = useState('');

    const searchHandler = async () => {
        const queryParams = {};
      
        if (sports.trim() !== '') {
            queryParams.sports = sports.trim();
        }
        if (start_date !== '') {
            queryParams.startdate = new Date(start_date).toISOString(); // Convert to ISO string
        }
        if (end_date !== '') {
            queryParams.enddate = new Date(end_date).toISOString(); // Convert to ISO string
        }

        if (Object.keys(queryParams).length > 0) {
            try {
                const res = await fetch(
                    `http://localhost:4000/search?${new URLSearchParams(queryParams)}`
                );
                if (!res.ok) {
                    alert("Something went wrong");
                } else {
                    const result = await res.json();
                    navigate(
                        `/search?${new URLSearchParams(queryParams)}`,
                        { state: result }
                    );
                }
            } catch (error) {
                console.error("Error while making the search request:", error);
                alert("Failed to perform search");
            }
        } else {
            alert("Please provide at least one search criteria");
        }
    }

    return (
        <Col lg="12">
            <div className="search_bar">
                <Form className="d-flex align-items-center gap-4">
                    

                    <FormGroup className="d-flex gap-3 form__group form__group-fast align-items-center">
                        <span>
                            <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30" height="30">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M597.333333 192m-106.666666 0a106.666667 106.666667 0 1 0 213.333333 0 106.666667 106.666667 0 1 0-213.333333 0Z" fill="#9f9c99"></path>
                                    <path d="M618.666667 582.4l-196.266667-87.466667c-21.333333-10.666667-32 21.333333-42.666667 42.666667s-87.466667 153.6-81.066666 177.066667c6.4 19.2 23.466667 29.866667 40.533333 29.866666 4.266667 0 8.533333 0 12.8-2.133333L614.4 661.333333c17.066667-4.266667 29.866667-21.333333 29.866667-38.4s-10.666667-34.133333-25.6-40.533333z" fill="#00147a"></path>
                                    <path d="M571.733333 324.266667l-46.933333-21.333334c-27.733333-12.8-61.866667 0-74.666667 27.733334L196.266667 876.8c-10.666667 21.333333 0 46.933333 21.333333 57.6 6.4 2.133333 12.8 4.266667 19.2 4.266667 17.066667 0 32-8.533333 38.4-23.466667 0 0 204.8-283.733333 221.866667-317.866667s104.533333-198.4 104.533333-198.4c10.666667-27.733333 0-61.866667-29.866667-74.666666z" fill="#00147a"></path>
                                    <path d="M864 334.933333c-14.933333-17.066667-42.666667-21.333333-59.733333-6.4l-106.666667 89.6-136.533333-74.666666c-23.466667-12.8-55.466667-8.533333-70.4 19.2-17.066667 27.733333-8.533333 61.866667 17.066666 72.533333l177.066667 72.533333c6.4 2.133333 12.8 4.266667 19.2 4.266667 10.666667 0 19.2-4.266667 27.733333-10.666667l128-106.666666c17.066667-14.933333 19.2-40.533333 4.266667-59.733334zM249.6 492.8l72.533333-108.8 98.133334 12.8 32-66.133333c8.533333-19.2 25.6-29.866667 44.8-32h-196.266667c-14.933333 0-27.733333 6.4-36.266667 19.2l-85.333333 128c-12.8 19.2-8.533333 46.933333 12.8 59.733333 4.266667 4.266667 12.8 6.4 21.333333 6.4 12.8 0 27.733333-6.4 36.266667-19.2z" fill="#9f9c99"></path>
                                </g>
                            </svg>

                        </span>
                        <div>
                            <h6 className="mb-0">Sports</h6>
                            <input
                                type="text"
                                placeholder="Quel sport tu cherches ?"
                                value={sports}
                                onChange={ev => setSports(ev.target.value)}
                                className="input-field" // Add this class for width adjustment
                            />
                        </div>
                    </FormGroup>


                    <FormGroup className="d-flex gap-3 form__group form__group-fast input-field">


                        <div>
                            <h6>Date de début</h6>
                            <input type="date"
                                value={start_date}
                                onChange={ev => setStartDate(ev.target.value)} />
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group form__group-fast input-field">

                        <div>
                            <h6>Date de fin</h6>
                            <input type="date" value={end_date}
                                onChange={ev => setEndDate(ev.target.value)} />
                        </div>
                    </FormGroup>
                    <span className="search_icon" type="submit" onClick={searchHandler}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 300 150"
                            style={{ fill: "rgb(8 47 73)" }}
                        >
                            <g
                                fill="rgb(8 47 73)"
                                fillRule="nonzero"
                                stroke="none"
                                strokeWidth="1"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeDasharray=""
                                strokeDashoffset="0"
                                fontFamily="none"
                                fontWeight="none"
                                fontSize="none"
                                textAnchor="none"
                                style={{ mixBlendMode: "normal" }}
                            >
                                <g transform="scale(5.12,5.12)">
                                    <path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path>
                                </g>
                            </g>
                        </svg>

                    </span>
                </Form>
            </div>
        </Col>
    )
}
