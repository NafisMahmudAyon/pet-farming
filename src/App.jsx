import { useCallback, useEffect, useRef, useState } from "react";













import "./App.css";

const ImageSlider = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevSlide = () => {
		const index = (currentIndex - 1 + images.length) % images.length;
		setCurrentIndex(index);
	};

	const goToNextSlide = () => {
		const index = (currentIndex + 1) % images.length;
		setCurrentIndex(index);
	};

	const autoAdvance = () => {
		// Go to the next slide after a certain time interval (e.g., every 5 seconds)
		const intervalId = setInterval(goToNextSlide, 3000); // Adjust the time interval here (5000ms = 5 seconds)

		// Clear the interval when the component unmounts or when the currentIndex changes
		return () => clearInterval(intervalId);
	};

	useEffect(autoAdvance, [currentIndex]); // Run the autoAdvance function when currentIndex changes

	return (
		<div className="w-full max-w-[100vw] relative">
			<button
				onClick={goToPrevSlide}
				className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded">
				Prev
			</button>
			<img
				src={images[currentIndex]}
				alt={`Slide ${currentIndex + 1}`}
				className="w-[100vw] h-[520px] lg:h-[560px] object-cover shadow-lg"
			/>
			<button
				onClick={goToNextSlide}
				className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded">
				Next
			</button>
		</div>
	);
};

const MasonryGrid = ({ images }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{images.map((photo, index) => (
				<div key={index} className="masonry-item rounded-lg shadow-md">
					<img
						src={photo}
						alt={`Photo ${index + 1}`}
						className="w-full h-auto rounded-lg"
						// style={{ aspectRatio: '1 / 1' }} // Maintain aspect ratio
					/>
				</div>
			))}
		</div>
	);
};

const JustifiedGrid = ({ images }) => {
	return (
		<div className="flex flex-wrap -mx-2">
			{images.map((photo, index) => (
				<div
					key={index}
					className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
					<img
						src={photo}
						alt={`Photo ${index + 1}`}
						className="w-full h-auto rounded-lg"
					/>
				</div>
			))}
		</div>
	);
};

const Midjourney = ({ images }) => {
	const [listOfImages, setListOfImages] = useState(images);

	const [selectedImage, setSelectedImage] = useState(null);

	const [selectedImageIndex, setSelectedImageIndex] = useState(null);

	const openImage = (index) => {
		setSelectedImageIndex(index);
		console.log(index);
	};

	const closeImage = () => {
		setSelectedImageIndex(null);
	};

	const goToPrevious = () => {
		setSelectedImageIndex((prevIndex) => {
			const newIndex =
				prevIndex === 0 ? listOfImages.length - 1 : prevIndex - 1;
			return newIndex;
		});
	};

	const goToNext = () => {
		setSelectedImageIndex((prevIndex) => {
			const newIndex =
				prevIndex === listOfImages.length - 1 ? 0 : prevIndex + 1;
			return newIndex;
		});
	};

	return (
		<>
			{/* <Navbar /> */}
			<div className="site flex-1 overflow-y-auto p-5">
				<background />
				<div className="main">
					<div className="masonry columns-1 md:columns-2 lg:columns-3 xl:columns-4 ">
						{listOfImages.map((image, index) => (
							<main key={index}>
								<article className="mItems mb-4">
									<img
										src={image}
										alt="info"
										onClick={() => openImage(index)}
									/>
								</article>
							</main>
						))}
					</div>
				</div>
				{selectedImageIndex !== null && (
					<div className="modal-overlay">
						<div className="modal">
							<span className="close" onClick={closeImage}>
								&times;
							</span>
							<img src={listOfImages[selectedImageIndex]} alt="Popup" />
							<div className="nav-buttons absolute top-1/2 left-1/2  ">
								<button onClick={goToPrevious} className="text-black">
									Previous
								</button>
								<button onClick={goToNext} className="text-black">
									Next
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

function App() {
	const slider = [
		"https://i.ibb.co/ZS4Rj5v/IMG-20230317-161600-393.jpg",
		"https://i.ibb.co/KKNKDpV/IMG-20230520-173040-900.jpg",
		"https://i.ibb.co/Z1Y3sfn/IMG-20230623-183616-224.jpg",
		"https://i.ibb.co/FmJJkVB/IMG-20230723-082539-905.jpg",
		"https://i.ibb.co/jhTxSF4/IMG-20230725-064540-907.jpg",
		"https://i.ibb.co/mz0JtYD/IMG-20230818-083408-657.jpg",
		"https://i.ibb.co/D8rGJWf/IMG-20230910-173846-745.jpg",
		"https://i.ibb.co/1zpBZG4/IMG-20231016-165627-937.jpg",
		"https://i.ibb.co/d097Skn/IMG-20231016-165704-514.jpg",
		"https://i.ibb.co/k2DcSRG/IMG-20231111-165600-573.jpg",
	];

	const kaloAll = [
		"https://i.ibb.co/ZS4Rj5v/IMG-20230317-161600-393.jpg",
		"https://i.ibb.co/ZMLtV5D/IMG-20230309-073616-204.jpg",
		"https://i.ibb.co/D9B2CqP/IMG-20230309-073613-597.jpg",
		"https://i.ibb.co/b1HSGrb/IMG-20230210-093123-170.jpg",
		"https://i.ibb.co/PF3WFft/IMG-20230210-093107-022.jpg",
		"https://i.ibb.co/x59LTjX/IMG-20230210-085541-543.jpg",
		"https://i.ibb.co/cYRzLXc/IMG-20230210-085534-369.jpg",
		"https://i.ibb.co/3WMPyDb/IMG-20230210-085524-457.jpg",
		"https://i.ibb.co/fvBrXpY/IMG-20230210-085301-785.jpg",
		"https://i.ibb.co/xM7z3bv/IMG-20230210-085257-508.jpg",
		"https://i.ibb.co/fr0tSqG/IMG-20230210-085249-529.jpg",
		"https://i.ibb.co/h8dFVBS/IMG-20230210-085247-201.jpg",
		"https://i.ibb.co/fHdcb1d/IMG-20230210-085025-152.jpg",
		"https://i.ibb.co/KVHKFP1/IMG-20230210-085012-376.jpg",
		"https://i.ibb.co/hdkQrpG/IMG-20230210-084955-375.jpg",
		"https://i.ibb.co/0XL0zc7/IMG-20230622-190924-243.jpg",
		"https://i.ibb.co/g9pNSgD/IMG-20230622-190921-726.jpg",
		"https://i.ibb.co/Dp3VSct/IMG-20230622-190919-396.jpg",
		"https://i.ibb.co/SrGkN11/IMG-20230622-190914-415.jpg",
		"https://i.ibb.co/x68WQzk/IMG-20230622-190909-597.jpg",
		"https://i.ibb.co/w7LFHWB/IMG-20230622-190902-256.jpg",
		"https://i.ibb.co/qCCCGxs/IMG-20230622-190900-791.jpg",
		"https://i.ibb.co/y0QTD3N/IMG-20230622-190857-433.jpg",
		"https://i.ibb.co/ncJR23d/IMG-20230622-190834-498.jpg",
		"https://i.ibb.co/P4tTSVk/IMG-20230622-190832-473.jpg",
		"https://i.ibb.co/w64vP9m/IMG-20230621-190532-692.jpg",
		"https://i.ibb.co/NSjWQDQ/IMG-20230621-190517-084.jpg",
		"https://i.ibb.co/F4gxfYT/IMG-20230621-190531-164.jpg",
		"https://i.ibb.co/r3JP80f/IMG-20230621-190509-383.jpg",
		"https://i.ibb.co/VjN0HpS/IMG-20230621-190503-973.jpg",
		"https://i.ibb.co/mJd2hVr/IMG-20230520-173330-275.jpg",
		"https://i.ibb.co/bd6rzTH/IMG-20230520-173045-764.jpg",
		"https://i.ibb.co/LSGtttN/IMG-20230520-173044-124.jpg",
		"https://i.ibb.co/KKNKDpV/IMG-20230520-173040-900.jpg",
		"https://i.ibb.co/ygqHqQc/IMG-20230504-174343-288.jpg",
		"https://i.ibb.co/NLc9j7r/IMG-20230501-074616-448.jpg",
		"https://i.ibb.co/x3DX7tS/IMG-20230426-141822-330.jpg",
		"https://i.ibb.co/7vmctmK/IMG-20230317-161611-472.jpg",
		"https://i.ibb.co/fYkpTKp/IMG-20230317-161609-583.jpg",
		"https://i.ibb.co/mhsGyPy/IMG-20230623-183244-136.jpg",
		"https://i.ibb.co/3kr1sM9/IMG-20230623-183226-540.jpg",
		"https://i.ibb.co/hLRB61P/IMG-20230623-183221-930.jpg",
		"https://i.ibb.co/sWP2f1T/IMG-20230623-183214-391.jpg",
		"https://i.ibb.co/CKyhYqM/IMG-20230623-183204-659.jpg",
		"https://i.ibb.co/bbbkzkb/IMG-20230622-192705-070.jpg",
		"https://i.ibb.co/Fw04QVk/IMG-20230622-192703-107.jpg",
		"https://i.ibb.co/r7h3RNw/IMG-20230622-192658-696.jpg",
		"https://i.ibb.co/MCnCqSB/IMG-20230622-192654-355.jpg",
		"https://i.ibb.co/jyyfBW8/IMG-20230622-192636-340.jpg",
		"https://i.ibb.co/zPf0tLS/IMG-20230623-183502-766.jpg",
		"https://i.ibb.co/NS9KXH0/IMG-20230623-183456-330.jpg",
		"https://i.ibb.co/bRnnq10/IMG-20230623-183453-808.jpg",
		"https://i.ibb.co/PWnv488/IMG-20230623-183452-049.jpg",
		"https://i.ibb.co/yWZ8DxQ/IMG-20230623-183352-164.jpg",
		"https://i.ibb.co/0j6YJfx/IMG-20230623-183341-283.jpg",
		"https://i.ibb.co/1ftCg8r/IMG-20230623-183326-591.jpg",
		"https://i.ibb.co/7zSkKmn/IMG-20230623-183311-805.jpg",
		"https://i.ibb.co/ctSJ2Xc/IMG-20230623-183250-796.jpg",
		"https://i.ibb.co/NVC2kCN/IMG-20230623-183249-516.jpg",
		"https://i.ibb.co/sP7WK6y/IMG-20230623-183247-022.jpg",
		"https://i.ibb.co/GW5gqYT/IMG-20230623-183245-615.jpg",
		"https://i.ibb.co/fkYtxKt/IMG-20230623-183749-768.jpg",
		"https://i.ibb.co/6mpLhsJ/IMG-20230623-183741-198.jpg",
		"https://i.ibb.co/w7p043Q/IMG-20230623-183656-061.jpg",
		"https://i.ibb.co/frcD8Tz/IMG-20230623-183654-445.jpg",
		"https://i.ibb.co/2FXN2CD/IMG-20230623-183651-071.jpg",
		"https://i.ibb.co/mCkF4Js/IMG-20230623-183627-885.jpg",
		"https://i.ibb.co/g9JgcTK/IMG-20230623-183626-442.jpg",
		"https://i.ibb.co/JdFGxSW/IMG-20230623-183620-022.jpg",
		"https://i.ibb.co/qDgrW1s/IMG-20230623-183511-563.jpg",
		"https://i.ibb.co/khtrZT0/IMG-20230623-183510-167.jpg",
		"https://i.ibb.co/yf3yDmn/IMG-20230623-183506-170.jpg",
		"https://i.ibb.co/dfR1rxr/IMG-20230623-183505-304.jpg",
		"https://i.ibb.co/p3K3WSj/IMG-20230623-183504-038.jpg",
	];
	const lalAll = [
		"https://i.ibb.co/z7Gkts6/IMG-20230706-170249-000.jpg",
		"https://i.ibb.co/cr3y9Xb/IMG-20230706-170448-663.jpg",
		"https://i.ibb.co/Wk2w3ZT/IMG-20230706-170449-607.jpg",
		"https://i.ibb.co/d5xLmvY/IMG-20230706-170450-584.jpg",
		"https://i.ibb.co/syDcNgM/IMG-20230710-190358-254.jpg",
		"https://i.ibb.co/L8DXWD4/IMG-20230710-190359-617.jpg",
		"https://i.ibb.co/k9GD2Zm/IMG-20230710-190415-384.jpg",
		"https://i.ibb.co/52yrfLB/IMG-20230710-190422-281.jpg",
		"https://i.ibb.co/rMNpjc5/IMG-20230714-181049-629.jpg",
		"https://i.ibb.co/MVQpLty/IMG-20230714-181053-049.jpg",
		"https://i.ibb.co/2s8fX8Y/IMG-20230714-181059-394.jpg",
		"https://i.ibb.co/M56d1Q4/IMG-20230723-094439-768.jpg",
		"https://i.ibb.co/fNcpDch/IMG-20230723-094442-179.jpg",
		"https://i.ibb.co/Krx3VTp/IMG-20230723-094628-671.jpg",
		"https://i.ibb.co/Dkqt3rC/IMG-20230728-093002-425.jpg",
		"https://i.ibb.co/QvtZK4Z/IMG-20230728-093003-747.jpg",
		"https://i.ibb.co/5hW10xq/IMG-20230728-093005-864.jpg",
		"https://i.ibb.co/Nt45gbB/IMG-20230728-093041-158.jpg",
		"https://i.ibb.co/YjF1tr3/IMG-20230728-093041-498.jpg",
		"https://i.ibb.co/thSYTTk/IMG-20230728-185324-059.jpg",
		"https://i.ibb.co/tH9R3Cc/IMG-20230728-185327-732.jpg",
		"https://i.ibb.co/NppKqHN/IMG-20230818-083339-151.jpg",
		"https://i.ibb.co/gMnz13n/IMG-20230818-083355-542.jpg",
		"https://i.ibb.co/VH0nKn4/IMG-20230818-083356-664.jpg",
		"https://i.ibb.co/4jnJcgQ/IMG-20230818-083408-657.jpg",
		"https://i.ibb.co/f4r5R1P/IMG-20230818-083409-877.jpg",
		"https://i.ibb.co/2v98PCN/IMG-20230818-083410-961.jpg",
		"https://i.ibb.co/LrbWjRZ/IMG-20230818-083440-653.jpg",
		"https://i.ibb.co/m6MnCXS/IMG-20230818-083443-905.jpg",
		"https://i.ibb.co/tPwtBvL/IMG-20230818-083448-131.jpg",
		"https://i.ibb.co/7J8D66X/IMG-20230818-083906-234.jpg",
		"https://i.ibb.co/FX7pgPj/IMG-20230818-083908-294.jpg",
		"https://i.ibb.co/8mGfF2C/IMG-20230819-163344-471.jpg",
		"https://i.ibb.co/W074k9s/IMG-20230819-163347-477.jpg",
		"https://i.ibb.co/QNHYMg5/IMG-20230822-190704-851.jpg",
		"https://i.ibb.co/jWz882V/IMG-20230822-190705-468.jpg",
		"https://i.ibb.co/3p2XsHv/IMG-20230822-190708-092.jpg",
		"https://i.ibb.co/FHfPS4M/IMG-20230909-165414-809.jpg",
		"https://i.ibb.co/sRMbg9Q/IMG-20230909-165421-699.jpg",
		"https://i.ibb.co/bNtqsnW/IMG-20230910-173846-745.jpg",
		"https://i.ibb.co/16qGWhH/IMG-20230910-173847-859.jpg",
		"https://i.ibb.co/wNFGJ8G/IMG-20230910-173850-976.jpg",
		"https://i.ibb.co/R0CpGBX/IMG-20230910-173855-626.jpg",
		"https://i.ibb.co/PtHFxsq/IMG-20230910-173857-711.jpg",
		"https://i.ibb.co/CHgtmQw/IMG-20230910-173923-609.jpg",
		"https://i.ibb.co/LJtVMmQ/IMG-20230910-173925-093.jpg",
		"https://i.ibb.co/zR00xF3/IMG-20230910-173926-582.jpg",
		"https://i.ibb.co/5YwH3Ng/IMG-20231013-164016-386.jpg",
		"https://i.ibb.co/sPFTFTj/IMG-20231013-164017-136.jpg",
		"https://i.ibb.co/HdZJn9H/IMG-20231013-164105-507.jpg",
		"https://i.ibb.co/pfJcpWL/IMG-20231013-164106-848.jpg",
		"https://i.ibb.co/pK3hqLB/IMG-20231013-164109-629.jpg",
		"https://i.ibb.co/ZWhsCmT/IMG-20231013-164110-930.jpg",
		"https://i.ibb.co/g7Qr6Qz/IMG-20231013-164112-795.jpg",
		"https://i.ibb.co/JpgmWrM/IMG-20231013-164113-481.jpg",
		"https://i.ibb.co/BV8PV3g/IMG-20231013-164117-461.jpg",
		"https://i.ibb.co/K7Kp6Q1/IMG-20231013-164118-339.jpg",
		"https://i.ibb.co/3Ys2dTC/IMG-20231013-164138-863.jpg",
		"https://i.ibb.co/pKfXRPR/IMG-20231013-164140-633.jpg",
		"https://i.ibb.co/5kz4hgb/IMG-20231013-164141-596.jpg",
		"https://i.ibb.co/sJ3mSyV/IMG-20231013-164143-238.jpg",
		"https://i.ibb.co/BTNQ3CF/IMG-20231013-164144-070.jpg",
		"https://i.ibb.co/92bzmJH/IMG-20231016-165616-709.jpg",
		"https://i.ibb.co/JF0CtXW/IMG-20231016-165620-331.jpg",
		"https://i.ibb.co/mDjvyRc/IMG-20231016-165621-509.jpg",
		"https://i.ibb.co/PDgVvDL/IMG-20231016-170229-022.jpg",
		"https://i.ibb.co/98TSVs2/IMG-20231016-170230-291.jpg",
		"https://i.ibb.co/1s2vr0H/IMG-20231016-170233-078.jpg",
		"https://i.ibb.co/cxvXjy7/IMG-20231016-170235-505.jpg",
		"https://i.ibb.co/vVHDLfw/IMG-20231016-170244-968.jpg",
		"https://i.ibb.co/XJckn76/IMG-20231111-165558-821.jpg",
		"https://i.ibb.co/rMZXs2v/IMG-20231111-165600-573.jpg",
		"https://i.ibb.co/GP1Xx0B/IMG-20231111-165601-849.jpg",
		"https://i.ibb.co/mS9W6QC/IMG-20231111-165609-106.jpg",
		"https://i.ibb.co/t2j4xc9/IMG-20231111-165610-417.jpg",
		"https://i.ibb.co/sqbvRsk/IMG-20230217-162002-168.jpg",
		"https://i.ibb.co/pJgfD6n/IMG-20230217-162006-614.jpg",
		"https://i.ibb.co/ZmFF8X9/IMG-20230217-163935-388.jpg",
		"https://i.ibb.co/QKnkCFL/IMG-20230217-163944-632.jpg",
		"https://i.ibb.co/9hBDb81/IMG-20230217-163948-220.jpg",
		"https://i.ibb.co/0nD3p4n/IMG-20230309-073613-597.jpg",
		"https://i.ibb.co/xJysLLB/IMG-20230309-073616-204.jpg",
		"https://i.ibb.co/PGLJmS0/IMG-20230317-161600-393.jpg",
		"https://i.ibb.co/JdzvkW6/IMG-20230317-161609-583.jpg",
		"https://i.ibb.co/4mMYzfn/IMG-20230317-161611-472.jpg",
		"https://i.ibb.co/z4L2pv7/IMG-20230317-164211-474.jpg",
		"https://i.ibb.co/J3cnbVd/IMG-20230317-164215-879.jpg",
		"https://i.ibb.co/q1WK4Kr/IMG-20230520-173335-225.jpg",
		"https://i.ibb.co/xSZTL56/IMG-20230520-173340-039.jpg",
		"https://i.ibb.co/nwwh1mY/IMG-20230623-183311-805.jpg",
		"https://i.ibb.co/0hCtgh8/IMG-20230623-183326-591.jpg",
		"https://i.ibb.co/9c7vxQH/IMG-20230623-183341-283.jpg",
		"https://i.ibb.co/YXVXQrH/IMG-20230623-183352-164.jpg",
		"https://i.ibb.co/MBsjqH2/IMG-20230623-183452-049.jpg",
		"https://i.ibb.co/qm0DH9b/IMG-20230623-183526-167.jpg",
		"https://i.ibb.co/WsSzwPq/IMG-20230623-183536-913.jpg",
		"https://i.ibb.co/xHDddjx/IMG-20230623-183614-701.jpg",
		"https://i.ibb.co/nBxV7kh/IMG-20230623-183616-224.jpg",
		"https://i.ibb.co/KDbhvdR/IMG-20230623-183620-022.jpg",
		"https://i.ibb.co/QXCMqZ3/IMG-20230623-183626-442.jpg",
		"https://i.ibb.co/R3rS3G1/IMG-20230623-183627-885.jpg",
		"https://i.ibb.co/q1SkCBp/IMG-20230623-183651-071.jpg",
		"https://i.ibb.co/4mVrvL2/IMG-20230623-183654-445.jpg",
		"https://i.ibb.co/HCVf7y4/IMG-20230623-183656-061.jpg",
		"https://i.ibb.co/JyyyBZX/IMG-20231117-123719-756.jpg",
		"https://i.ibb.co/g770jNH/IMG-20231117-123725-115.jpg",
		"https://i.ibb.co/Hd8crsw/IMG-20231117-123726-451.jpg",
		"https://i.ibb.co/PQL9B4x/IMG-20231117-123727-789.jpg",
		"https://i.ibb.co/T1PRMHk/IMG-20231117-123728-972.jpg",
		"https://i.ibb.co/gyLH20c/IMG-20231117-123730-154.jpg",
		"https://i.ibb.co/5R6GKCj/IMG-20231117-123733-154.jpg",
		"https://i.ibb.co/nQ4Bkmh/IMG-20231117-123735-655.jpg",
		"https://i.ibb.co/PhJFrW6/IMG-20231117-123738-006.jpg",
		"https://i.ibb.co/sFXpkKV/IMG-20231117-123739-056.jpg",
		"https://i.ibb.co/zQsXH1q/IMG-20231117-143220-174.jpg",
		"https://i.ibb.co/GdZCZXg/IMG-20231117-143221-444.jpg",
	];

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 3, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	};

	const kaloAllTransformed = kaloAll.map((url) => ({
		src: url,
	}));
	console.log(kaloAllTransformed);

	const [goat, setGoat] = useState("");

	return (
		<div className="">
			<div className="">
				<h1 className="text-3xl text-center my-6 mb-10 font-bold ">
					Pet Farming
				</h1>
				<ImageSlider images={slider} />
			</div>
			{/* <LightGallery
				speed={500}
				plugins={[lgThumbnail, lgZoom]}
				elementClassNames="gallery-item"
				onInit={onInit}>
				{getItems()}
			</LightGallery> */}
			{/* <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
				<div id="animated-thumbnails">
					<a href="https://i.ibb.co/ZS4Rj5v/IMG-20230317-161600-393.jpg">
						<img
							alt="img1"
							src="https://i.ibb.co/ZS4Rj5v/IMG-20230317-161600-393.jpg"
						/>
					</a>
					<a href="https://i.ibb.co/ZMLtV5D/IMG-20230309-073616-204.jpg">
						<img
							alt="img2"
							src="https://i.ibb.co/ZMLtV5D/IMG-20230309-073616-204.jpg"
						/>
					</a>
					<a href="https://i.ibb.co/ZS4Rj5v/IMG-20230317-161600-393.jpg">
						<img
							alt="img1"
							src="https://i.ibb.co/ZS4Rj5v/IMG-20230317-161600-393.jpg"
						/>
					</a>
					<a href="https://i.ibb.co/ZMLtV5D/IMG-20230309-073616-204.jpg">
						<img
							alt="img2"
							src="https://i.ibb.co/ZMLtV5D/IMG-20230309-073616-204.jpg"
						/>
					</a>
				</div>
			</LightGallery> */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 mx-auto w-[300px] md:w-[650px] lg:w-[1000px] ">
				<div
					className="flex flex-col justify-center items-center w-[300px] border rounded-md overflow-hidden cursor-pointer "
					onClick={() => setGoat("kalo")}>
					<img
						src="https://i.ibb.co/NVC2kCN/IMG-20230623-183249-516.jpg"
						alt=""
					/>
					<div className="p-3 w-full ">
						<h1 className="text-3xl text-center ">Kalo</h1>
						<h3 className="my-1 text-left w-full ">
							Buy: <span>January-01-2023</span>
						</h3>
						<h3 className="my-1 text-left w-full ">
							Sell: <span>January-01-2023</span>
						</h3>
					</div>
				</div>
				<div
					className="flex flex-col justify-center items-center w-[300px] border rounded-md overflow-hidden cursor-pointer "
					onClick={() => setGoat("lal")}>
					<img
						src="https://i.ibb.co/mS9W6QC/IMG-20231111-165609-106.jpg"
						alt=""
					/>
					<div className="p-3 w-full ">
						<h1 className="text-3xl text-center ">Lal</h1>
						<h3 className="my-1 text-left w-full ">
							Buy: <span>February-17-2023</span>
						</h3>
						<h3 className="my-1 text-left w-full ">
							Sell: <span>November-17-2023</span>
						</h3>
					</div>
				</div>
				<div
					className="flex flex-col justify-center items-center w-[300px] border rounded-md overflow-hidden cursor-pointer "
					onClick={() => setGoat("chompa")}>
					<img
						src="https://i.ibb.co/mS9W6QC/IMG-20231111-165609-106.jpg"
						alt=""
					/>
					<div className="p-3 w-full ">
						<h1 className="text-3xl text-center ">Chompa</h1>
						<h3 className="my-1 text-left w-full ">
							Buy: <span>July-21-2023</span>
						</h3>
						<h3 className="my-1 text-left w-full ">
							Sell: <span>Not sell yet.</span>
						</h3>
					</div>
				</div>

				<div className="flex justify-center items-center w-[300px] border">
					{/* Content for the fourth grid item */}
				</div>
			</div>
			{goat === "kalo" && (
				<div className="fixed-container fixed top-0 left-0 w-full min-h-[100vh] bg-slate-900 flex justify-center overflow-auto ">
					<div className="relative overflow-auto">
						<div>
							<h1>Kalo</h1>
							<h2>Born: Don't know.</h2>
							<h2>Buying Date: January 01, 2023</h2>
							<h2>Buying Price: 6400৳</h2>
							<h2>Selling Date: Don't know.</h2>
							<h2>Selling Price: 10500৳</h2>
						</div>

						<Midjourney images={kaloAll} />

						<div
							className="top-2 right-2 absolute "
							onClick={() => setGoat("")}>
							close
						</div>
					</div>
				</div>
			)}
			{goat === "lal" && (
				<div className="fixed-container fixed top-0 left-0 w-full min-h-[100vh] bg-slate-900 flex justify-center overflow-auto ">
					<div className="relative overflow-auto">
						<div>
							<h1>Lal</h1>
							<h2>Born: Don't know.</h2>
							<h2>Buying Date: February 17, 2023</h2>
							<h2>Buying Price: 4500৳</h2>
							<h2>Selling Date: November 17, 2023</h2>
							<h2>Selling Price: 12000৳</h2>
						</div>

						<Midjourney images={lalAll} />

						<div
							className="top-2 right-2 absolute "
							onClick={() => setGoat("")}>
							close
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;

