import React , {useEffect , useState} from 'react'
import Lottie from 'react-lottie';
import dangerLottie from '../../../lottieAnimation/danger-Animation.json'

const DangerAlert = ({dangerMsg}) => {
  const [visible, setVisible] = useState(true);
      useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
      }, []);
  const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: dangerLottie,
          rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
          },
      };
  return (
    <div className={`
      fixed top-0  right-0 z-50 px-2 pt-0 pb-4 rounded-2xl  text-white bg-red-800 
      transition-transform duration-500 ease-in-out
      ${visible ? 'translate-x-0' : 'translate-x-full'}
    `} style={{width : "25em" , height : "fit-content"}}>
          <div className='flex  items-center'>
              <div>
                  <Lottie options={defaultOptions} height={80} width={80} />
              </div>
              <div>
                  <h1 className='text-3xl'> Error</h1>
              </div>
          </div>
          <p className='mx-5'>{dangerMsg}</p>
      </div>
  )
}

export default DangerAlert
