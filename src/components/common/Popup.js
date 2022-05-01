import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	useEffect(() => {
		let isScroll = null;

		open ? (isScroll = 'hidden') : (isScroll = 'auto');
		document.body.style.overflow = isScroll;

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [open]);

	return (
		// 해당 컴포넌트가 unmount시 사라지는 모션이 끝난 뒤에 DOM제거
		<AnimatePresence>
			{open && (
				<motion.aside
					initial={{ opacity: 0, scale: 0 }} //모션이 일어나기전 초기값 설정
					animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} //mount시 동작될 값 설정
					exit={{ opacity: 0, scale: 0 }} //unmount시 동작될 값 설정
					className='popup'>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
						exit={{ opacity: 0 }}
						className='con'>
						{props.children}
					</motion.div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Popup;
