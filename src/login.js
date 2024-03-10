import {React,useState} from 'react';
import logo from './images/profilelogo.png';
import './login.css'
import { callApi, errorResponse, setSession } from './main';
const popupwindowstyle = { width: '300px', height: '450px', background: 'white' };
const popupwindowstyle1 = { width: '300px', height: '500px', background: 'white' };
const logostyle = { width: '75px', height: '75px', position: 'absolute', left: '115px', top: '10px' };
const logodivstyle = { height: '100px' };
const space = { height: '10px' };

function Login() {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    window.onload = function () {
        var login = document.getElementById('login');
        login.style.display = "block";
    }

    function validate() {
        var T1 = document.getElementById('T1');
        var T2 = document.getElementById('T2');

        var url = "http://localhost:5000/login/signin";
        var data = JSON.stringify({
            emailid: T1.value,
            pwd: T2.value,
            role:document.getElementById('roleSelect').value
        });
        callApi("POST", url, data, loginSuccess, errorResponse);
    }
    function loginSuccess(res) {
        var data = JSON.parse(res);
        if (data === 1) {
            var T1 = document.getElementById('T1');
            setSession("sid", T1.value, (24 * 60));
            var role = document.getElementById('roleSelect').value;
            switch (role) {
                case 'student':
                    window.location.replace("/studentpage");
                    break;
                case 'faculty':
                    window.location.replace("/facultypage");
                    break;
                case 'admin':
                    window.location.replace("/adminpage");
                    break;
                default:
                    alert("Invalid Role");
                    break;
            }
        } else {
            alert("Invalid Credentials!");
        }
    }
    function registration() {
        var reg = document.getElementById('registration');
        var login = document.getElementById('login');
        login.style.display = "none";
        reg.style.display = "block";
    }

    function forgotPassword() {
        var forgotPasswordPopup = document.getElementById('forgotPassword');
        forgotPasswordPopup.style.display = 'block';
    }
 
    function resetPassword() {
        const username = document.getElementById('username').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
    
        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }
    
        // Construct the request body
        const requestBody = {
            username: username,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };
    
        // Make a POST request to your backend
        fetch('http://localhost:5000/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Password reset failed.');
            }
            return response.text();
        })
        .then(data => {
            alert(data); // Password reset successfully
        })
        .catch(error => {
            console.error('Error occurred:', error);
            alert('Error occurred while resetting password.');
        });
    }
    
    function register() {
        var RT1 = document.getElementById('RT1');
        var RT2 = document.getElementById('RT2');
        var RT3 = document.getElementById('RT3');
        var RT4 = document.getElementById('RT4');
        var RT5 = document.getElementById('RT5');
        var RT6 = document.getElementById('RT6');
        RT1.style.border = "";
        RT2.style.border = "";
        RT3.style.border = "";
        RT4.style.border = "";
        RT5.style.border = "";
        RT6.style.border = "";
        if (RT1.value === "") {
            RT1.style.border = "1px solid red";
            RT1.focus();
            return;
        }
        if (RT2.value === "") {
            RT2.style.border = "1px solid red";
            RT2.focus();
            return;
        }
        if (RT3.value === "") {
            RT3.style.border = "1px solid red";
            RT3.focus();
            return;
        }
        if (RT4.value === "") {
            RT4.style.border = "1px solid red";
            RT4.focus();
            return;
        }
        if (RT5.value === "") {
            RT5.style.border = "1px solid red";
            RT5.focus();
            return;
        }
        if (RT6.value === "") {
            RT6.style.border = "1px solid red";
            RT6.focus();
            return;
        }
        if (RT5.value !== RT6.value) {
            alert("Password and Re-type Password must be same");
            RT5.style.border = "1px solid red";
            RT5.focus();
            return;
        }

        var url = "http://localhost:5000/registration/signup";
        var data = JSON.stringify({
            firstname: RT1.value,
            lastname: RT2.value,
            contactno: RT3.value,
            emailid: RT4.value,
            pwd: RT5.value,
            role:document.getElementById('roleSelectReg').value
        });
        callApi("POST", url, data, registeredSuccess, errorResponse);

        RT1.value = "";
        RT2.value = "";
        RT3.value = "";
        RT4.value = "";
        RT5.value = "";
        RT6.value = "";

        var login = document.getElementById('login');
        var registration = document.getElementById('registration');
        registration.style.display = 'none';
        login.style.display = 'block';
    }

    function registeredSuccess(res) {
        var data = JSON.parse(res);
        alert(data);
    }

    return (
        <div className='full-height'>
            <div id='header' className='loginheader'>
                Student Course Management 
                <p className='text'>
                    Welcome to Our Course Management System
                    <div style={space}></div>
                    <div style={space}></div>
                    →A student course management system is a comprehensive platform designed to streamline and enhance 
                    the academic journey for students. It serves as a centralized hub where students  can access a range of essential features, including course
                    registration, assignment submission, grades tracking, and communication tools. By providing a user-friendly interface
                    and personalized experiences, these systems empower students to manage their academic responsibilities efficiently 
                    while fostering collaboration and engagement within the learning community. With features such as automated reminders,
                    progress tracking, and access to educational resources, student course management systems play a vital role in 
                    facilitating a seamless and enriching educational experience for students across various academic institutions.
                    <div style={space}></div>
                    <div style={space}></div>
                </p>
                <p className='text1'>   
                →Certainly! Here's a formal representation of the instructions for the login page:
                    <div style={space}></div>
                    *Please select your role and login:
                    <div style={space}></div>
                    *Admin: If you are an administrator managing the system.
                    <div style={space}></div>
                    *Faculty: If you are a faculty member.
                    <div style={space}></div>
                    *Student: If you are a student.
                    <div style={space}></div>
                    →If you are using the system for the first time, please register before logging in. Once registered, you can login with your credentials. If you wish to change your password later, you can do so through the account settings.
                    <div style={space}></div>
                    --**Thank you for choosing our system. If you encounter any issues or need assistance, please don't hesitate to contact our support team**--
                    
                </p>
            </div>
            <div id='content' className='logincontent'>
                <div id='login' className='popup'>
                    <div id='popupwindow' className='popupwindow' style={popupwindowstyle} >
                        <div className='loginstyle1'>Login</div>
                        <div className='loginstyle2'>
                            <div style={logodivstyle}>
                                <img src={logo} alt='' style={logostyle} />
                            </div>
                            <div>Username*</div>
                            <div><input type='text' id='T1' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div><input type='password' id='T2' className='txtbox' /></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div>Select Role*</div>
                            <div>
                                <select id='roleSelect' className='txtbox'>
                                    <option value=''>Select Role</option>
                                    <option value='student'>Student</option>
                                    <option value='faculty'>Faculty</option>
                                    <option value='admin'>Admin</option>
                                </select>
                            </div>
                            <div><button className='btn' onClick={validate}>Sign In</button></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div>New user? <label className='linklabel' onClick={registration}>Register here</label></div>
                            <div>Forgot Password? <label className='linklabel' onClick={forgotPassword}>Click here</label></div>
                        </div>
                    </div>
                </div>
                <div id='registration' className='popup'>
                    <div id='registrationwindow' className='popupwindow' style={popupwindowstyle1}>
                        <div className='loginstyle1'>New Registration</div>
                        <div className='loginstyle2'>
                            <div>First Name*</div>
                            <div><input type='text' id='RT1' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Last Name*</div>
                            <div><input type='text' id='RT2' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Contact Number*</div>
                            <div><input type='text' id='RT3' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Email ID*</div>
                            <div><input type='text' id='RT4' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div><input type='password' id='RT5' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Re-type Password*</div>
                            <div><input type='password' id='RT6' className='txtbox' /></div>
                            <div style={space}></div>
                            <div>Select Role*</div>
                            <div>
                                <select id='roleSelectReg' className='txtbox'>
                                    <option value='student'>Student</option>
                                    <option value='faculty'>Faculty</option>
                                    <option value='admin'>Admin</option>
                                </select>
                            </div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div><button className='btn' onClick={register}>Register</button></div>
                        </div>
                    </div>
                </div>
                {/* Forgot Password Popup */}
                <div id='forgotPassword' className='popup'>
                    <div id='forgotPasswordWindow' className='popupwindow' style={popupwindowstyle}>
                        <div className='loginstyle1'>Forgot Password</div>
                        <div className='loginstyle2'>
                            <div>Username*</div>
                            <div><input type='text' id='username' className='txtbox' value={username} onChange={e => setUsername(e.target.value)} /></div>
                            <div style={space}></div>
                            <div>New Password*</div>
                            <div><input type='password' id='newPassword' className='txtbox' value={newPassword} onChange={e => setNewPassword(e.target.value)} /></div>
                            <div style={space}></div>
                            <div>Confirm Password*</div>
                            <div><input type='password' id='confirmPassword' className='txtbox' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></div>
                            <div style={space}></div>
                            <div><button className='btn' onClick={resetPassword}>Reset Password</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='footer' className='loginfooter'>Copyright @ Student Course Management System. All rights reserved.</div>
        </div>
    );
}

export default Login;

