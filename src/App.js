import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import CartBody from "./components/CartBody/CartBody";
import Blog from "./components/Blog/Blog";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Features from "./components/Features/Features";
import Testimonials from "./components/Testimonials/Testimonials";

// Custom hook for timer
const useTimer = (initialTime = 0) => {
	const [timeLeft, setTimeLeft] = useState(initialTime);
	const [isActive, setIsActive] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		if (isActive && timeLeft > 0) {
			timerRef.current = setInterval(() => {
				setTimeLeft(prev => {
					if (prev <= 1) {
						clearInterval(timerRef.current);
						setIsActive(false);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [isActive, timeLeft]);

	const startTimer = useCallback((duration) => {
		setTimeLeft(duration);
		setIsActive(true);
	}, []);

	const stopTimer = useCallback(() => {
		setIsActive(false);
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
	}, []);

	return { timeLeft, isActive, startTimer, stopTimer };
};

// Memoized Timer Component
const Timer = memo(({ isBreak, timeLeft, currentExerciseTime, onStartExercise, onStopExercise, exerciseStartTime }) => {
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	return (
		<div className="timer-section bg-light rounded-4 p-4 mb-4">
			<h5 className="fw-bold mb-3">
				<i className="fas fa-clock me-2"></i>
				{isBreak ? 'Break Timer' : 'Exercise Timer'}
			</h5>
			<div className="timer-display text-center mb-3">
				<div className="display-4 fw-bold">
					{isBreak ? formatTime(timeLeft) : formatTime(currentExerciseTime)}
				</div>
				<small className="text-muted">
					{isBreak ? 'Break Time Remaining' : 'Current Exercise Duration'}
				</small>
			</div>
			<div className="timer-controls d-flex justify-content-center gap-2">
				{!isBreak && (
					<>
						<button 
							className="btn btn-success"
							onClick={onStartExercise}
							disabled={exerciseStartTime !== null}
						>
							<i className="fas fa-play me-2"></i>Start Exercise
						</button>
						<button 
							className="btn btn-danger"
							onClick={onStopExercise}
							disabled={exerciseStartTime === null}
						>
							<i className="fas fa-stop me-2"></i>Stop Exercise
						</button>
					</>
				)}
			</div>
		</div>
	);
});

// Memoized Break Buttons Component
const BreakButtons = memo(({ brtime, onTimeClick, timerActive }) => (
	<div className="break-section bg-light rounded-4 p-4 mb-4">
		<h5 className="fw-bold mb-3">
			<i className="fas fa-coffee me-2"></i>
			Add A Break
		</h5>
		<div className="break-buttons d-flex flex-wrap gap-2">
			{[10, 20, 30, 40, 50].map((time) => (
				<button
					key={time}
					onClick={onTimeClick}
					className={`btn ${brtime === `${time}s` ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-3`}
					disabled={timerActive}
				>
					{time}s
				</button>
			))}
		</div>
	</div>
));

// Memoized Exercise Details Component
const ExerciseDetails = memo(({ brtime, sumtime }) => (
	<div className="exercise-details-section">
		<h5 className="fw-bold mb-3">
			<i className="fas fa-chart-line me-2"></i>
			Exercise Details
		</h5>
		<div className="detail-card bg-light rounded-4 p-3 mb-3 d-flex justify-content-between align-items-center">
			<div>
				<h6 className="mb-0">Break Time</h6>
				<small className="text-muted">Selected break duration</small>
			</div>
			<span className="badge bg-primary rounded-pill px-3 py-2">{brtime || 'Not set'}</span>
		</div>
		<div className="detail-card bg-light rounded-4 p-3 d-flex justify-content-between align-items-center">
			<div>
				<h6 className="mb-0">Total Exercise Time</h6>
				<small className="text-muted">Total time spent exercising</small>
			</div>
			<span className="badge bg-success rounded-pill px-3 py-2">{sumtime || 0} minutes</span>
		</div>
	</div>
));

// Memoized Progress Section Component
const ProgressSection = memo(({ sumtime }) => (
	<div className="progress-section mt-4">
		<h5 className="fw-bold mb-3">
			<i className="fas fa-trophy me-2"></i>
			Today's Progress
		</h5>
		<div className="progress mb-3" style={{height: '10px'}}>
			<div 
				className="progress-bar bg-success" 
				role="progressbar" 
				style={{width: `${Math.min((sumtime || 0) / 60 * 100, 100)}%`}}
				aria-valuenow={sumtime || 0} 
				aria-valuemin="0" 
				aria-valuemax="60"
			></div>
		</div>
		<p className="text-muted text-center mb-0">
			{sumtime ? `${sumtime} minutes completed` : 'Start your exercise journey!'}
		</p>
	</div>
));

function App() {
	const [cartbody, setCartbody] = useState([]);
	const [brtime, setBrtime] = useState('');
	const [totaltime, setTotaltime] = useState([]);
	const [sumtime, setSumtime] = useState();
	const [isBreak, setIsBreak] = useState(false);
	const [exerciseStartTime, setExerciseStartTime] = useState(null);
	const [currentExerciseTime, setCurrentExerciseTime] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	// Use custom timer hook
	const { timeLeft, isActive: timerActive, startTimer } = useTimer();

	// Calculate pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = cartbody.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(cartbody.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	useEffect(() => {
		fetch("/activitys.json")
			.then((res) => res.json())
			.then((data) => setCartbody(data));
	}, []);

	useEffect(() => {
		const Getlocalcartstore = () => {
			const storedCart = localStorage.getItem("Break-Time");
			const shoppingCart = JSON.parse(storedCart);
			setBrtime(shoppingCart);
		};
		Getlocalcartstore();
	}, [cartbody]);

	// Exercise timer effect
	useEffect(() => {
		let exerciseTimer;
		if (exerciseStartTime) {
			exerciseTimer = setInterval(() => {
				const elapsed = Math.floor((Date.now() - exerciseStartTime) / 1000);
				setCurrentExerciseTime(elapsed);
			}, 1000);
		}
		return () => clearInterval(exerciseTimer);
	}, [exerciseStartTime]);

	const startExercise = useCallback(() => {
		setExerciseStartTime(Date.now());
		setIsBreak(false);
	}, []);

	const stopExercise = useCallback(() => {
		setExerciseStartTime(null);
		setCurrentExerciseTime(0);
	}, []);

	const playNotificationSound = useCallback(() => {
		const audio = new Audio('/notification.mp3');
		audio.play().catch(err => console.log('Audio play failed:', err));
	}, []);

	const showNotification = useCallback(() => {
		if (Notification.permission === "granted") {
			new Notification(isBreak ? "Break Time Over!" : "Exercise Time Over!", {
				body: isBreak ? "Time to get back to exercise!" : "Great job! Take a break.",
				icon: "/images/profile.png"
			});
		}
	}, [isBreak]);

	// Request notification permission
	useEffect(() => {
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}
	}, []);

	const Totaltime = useCallback((selectProduct) => {
		let newCart = [...totaltime, parseInt(selectProduct.time)];
		setTotaltime(newCart);
		setSumtime(
			totaltime.reduce(
				(a, v) => (a = a + v),
				parseInt(selectProduct.time),
			),
		);
	}, [totaltime]);

	const Handletimeonclick = useCallback((e) => {
		let timevalue = e.target.innerText;
		setBrtime(timevalue);
		localStorage.setItem("Break-Time", JSON.stringify(timevalue));
		startTimer(parseInt(timevalue));
		setIsBreak(true);
	}, [startTimer]);

	const ActivitiesPage = () => (
		<div className="main-container container fade-in">
			<div className="row">
				<div className="col-lg-8">
					<div className="activityscarts-maindiv">
						{currentItems.map((cart) => (
							<CartBody
								key={cart.id}
								cart={cart}
								Totaltime={Totaltime}
							/>
						))}
					</div>
					
					{/* Pagination */}
					{totalPages > 1 && (
						<div className="pagination-container d-flex justify-content-center align-items-center mt-4">
							<nav aria-label="Page navigation">
								<ul className="pagination">
									<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
										<button 
											className="page-link" 
											onClick={() => handlePageChange(currentPage - 1)}
											disabled={currentPage === 1}
										>
											<i className="fas fa-chevron-left"></i>
										</button>
									</li>
									
									{[...Array(totalPages)].map((_, index) => (
										<li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
											<button 
												className="page-link"
												onClick={() => handlePageChange(index + 1)}
											>
												{index + 1}
											</button>
										</li>
									))}
									
									<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
										<button 
											className="page-link"
											onClick={() => handlePageChange(currentPage + 1)}
											disabled={currentPage === totalPages}
										>
											<i className="fas fa-chevron-right"></i>
										</button>
									</li>
								</ul>
							</nav>
						</div>
					)}
				</div>
				<div className="col-lg-4">
					<div className="informationdiv p-4">
						<div className="profile-section text-center mb-4">
							<div className="profile-image-container mb-3">
								<img className="img-fluid rounded-circle" src="/images/profile.png" alt="Profile" />
							</div>
							<div className="profile-info">
								<h4 className="fw-bold mb-1">Saifuddin Ahammed</h4>
								<p className="text-muted mb-0">
									<i className="fas fa-map-marker-alt me-2"></i>
									Mymensingh, Bangladesh
								</p>
							</div>
						</div>

						<Timer 
							isBreak={isBreak}
							timeLeft={timeLeft}
							currentExerciseTime={currentExerciseTime}
							onStartExercise={startExercise}
							onStopExercise={stopExercise}
							exerciseStartTime={exerciseStartTime}
						/>

						<div className="stats-section d-flex justify-content-around mb-4">
							<div className="stat-card bg-light rounded-4 p-3 text-center">
								<i className="fas fa-weight text-primary mb-2"></i>
								<h5 className="mb-0">70kg</h5>
								<small className="text-muted">Weight</small>
							</div>
							<div className="stat-card bg-light rounded-4 p-3 text-center">
								<i className="fas fa-ruler-vertical text-success mb-2"></i>
								<h5 className="mb-0">5.5</h5>
								<small className="text-muted">Height</small>
							</div>
							<div className="stat-card bg-light rounded-4 p-3 text-center">
								<i className="fas fa-birthday-cake text-danger mb-2"></i>
								<h5 className="mb-0">30yrs</h5>
								<small className="text-muted">Age</small>
							</div>
						</div>

						<BreakButtons 
							brtime={brtime}
							onTimeClick={Handletimeonclick}
							timerActive={timerActive}
						/>

						<ExerciseDetails 
							brtime={brtime}
							sumtime={sumtime}
						/>

						<ProgressSection sumtime={sumtime} />
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Router>
			<div>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/features" element={<Features />} />
					<Route path="/testimonials" element={<Testimonials />} />
					<Route path="/activities" element={<ActivitiesPage />} />
					<Route path="/blog" element={<Blog />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
