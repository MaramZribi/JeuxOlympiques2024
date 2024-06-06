import React, { useState } from "react";
import "./searchBar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const navigate = useNavigate();
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [sports, setSports] = useState('');
    const [utilisation, setUtilisation] = useState('');

    const searchHandler = async () => {
        const queryParams = {};
        if (utilisation.trim() !== '') {
            queryParams.utilisation = utilisation.trim();
        }
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
                            <svg fill="#081249" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="0 0 488.679 488.679" xml: space="preserve" stroke="#081249"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M279.554,155.721l-52.262,27.656l-34.703-27.066c-0.471-1.591-0.913-3.197-1.605-4.732 c-4.316-9.503-12.251-16.903-22.013-20.573l-0.237-0.085c-20.361-7.629-43.066,2.699-50.686,23.059l-32.625,87.061 c-1.561,0.307-3.086,0.747-4.616,1.124L53.144,135.866c-2.486-9.613-12.331-15.399-21.918-12.866 c-9.603,2.496-15.37,12.314-12.849,21.918l29.1,111.859C18.879,275.838,0,308.352,0,345.212 c0,58.584,47.666,106.238,106.24,106.238c23.918,0,45.931-8.03,63.708-21.414h81.958c8.896,0,16.12-7.219,16.12-16.123 c0-1.261-0.439-2.379-0.707-3.559c7.841-6.503,11.085-17.47,7.118-27.461l-39.505-99.584c-3.671-9.221-12.583-15.268-22.487-15.268 c-0.047,0-0.079,0-0.111,0l-33.099,0.158c-4.675-4.424-9.73-8.455-15.128-11.982l23.538-62.857l28.044,21.87 c2.896,2.253,6.406,3.409,9.92,3.409c2.58,0,5.181-0.613,7.54-1.873l61.49-32.546c7.873-4.165,10.88-13.919,6.707-21.794 C297.204,154.571,287.411,151.572,279.554,155.721z M211.895,356.418L228.3,397.79h-29.854 C205.579,385.335,210.317,371.352,211.895,356.418z M176.543,345.212c0,38.761-31.537,70.29-70.303,70.29 s-70.292-31.529-70.292-70.29c0-38.766,31.525-70.303,70.292-70.303S176.543,306.447,176.543,345.212z"></path> <path d="M196.264,125.893c24.503,0,44.342-19.848,44.342-44.341c0-24.477-19.839-44.324-44.342-44.324 c-24.467,0-44.307,19.848-44.307,44.324C151.957,106.045,171.796,125.893,196.264,125.893z"></path> <path d="M106.24,324.854c-11.244,0-20.345,9.109-20.345,20.358c0,11.236,9.102,20.346,20.345,20.346 c11.24,0,20.357-9.109,20.357-20.346C126.597,333.963,117.479,324.854,106.24,324.854z"></path> <path d="M360.816,270.145c-18.99,0-34.355,15.384-34.355,34.365c0,18.982,15.366,34.366,34.355,34.366 c18.99,0,34.359-15.384,34.359-34.366C395.176,285.529,379.806,270.145,360.816,270.145z"></path> <path d="M488.104,290.655c-0.817-0.936-2.264-1.032-3.209-0.198c-4.786,4.237-49.276,38.088-61.644,111.71l-20.91-40.317 c-2.047-3.952-6.912-5.495-10.868-3.448c-3.952,2.048-5.493,6.912-3.446,10.864l32.043,61.795c1.277,2.433,3.747,4.165,6.675,4.338 c4.458,0.267,8.268-3.125,8.521-7.565l0.016-0.127v-0.016c0.297-11.74,4.855-88.136,52.512-133.691l0.253-0.266 C488.863,292.889,488.895,291.552,488.104,290.655z"></path> </g> </g></svg>
                        </span>
                        <div>
                            <h6 className="mb-0">Utilisation</h6>
                            <input
                                type="text"
                                placeholder="Quel Catégorie tu cherches ?"
                                value={utilisation}
                                onChange={ev => setUtilisation(ev.target.value)}
                                className="input-field" // Add this class for width adjustment
                            />
                        </div>
                    </FormGroup>

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
