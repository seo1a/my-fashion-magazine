import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ModalProps {
  imageSrc: string;
  onClose: () => void;
}

export default function Modal({ imageSrc, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative max-w-4xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg"
      >
        <img src={imageSrc} alt="Snap" className="max-h-[80vh] object-contain" />
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-myGreen text-white font-poppins_black text-xl px-3 py-1 rounded"
        >
          X
        </button>
      </div>
    </div>
  );
}
