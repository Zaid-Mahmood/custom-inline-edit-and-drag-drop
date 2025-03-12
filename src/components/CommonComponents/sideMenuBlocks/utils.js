import img1 from '../../../assets/blocks/vite.svg';
import img2 from '../../../assets/blocks/s_three_columns.svg';
import img3 from '../../../assets/blocks/picture-img.svg';
import img4 from '../../../assets/blocks/picture-img-4.svg';
import img5 from '../../../assets/blocks/img-5.svg';
import img6 from '../../../assets/blocks/img-6.svg';
import img7 from '../../../assets/blocks/img-7.svg';
import img8 from '../../../assets/blocks/img-8.svg';
import Banner from '../../NaturalCalmComponents/Banner/Banner';
import Content from '../../NaturalCalmComponents/Content/Content';
import ImgSection from '../../NaturalCalmComponents/Img-Section/ImgSection';
import ImagesSection from '../../NaturalCalmComponents/Images-Section/ImagesSection';
import People from '../../NaturalCalmComponents/people/People';
import Text from '../../NaturalCalmComponents/Text/Text';
import ContactSection from '../../NaturalCalmComponents/Contact-Section/ContactSection';
import SocialMedia from '../../NaturalCalmComponents/SocialMedia/SocialMedia';
export const NaturalCalmBlocks = [
    { id: 0, img: img1, title: "Banner", component: Banner },
    { id: 1, img: img2, title: "Bedge", component: ImgSection },
    { id: 2, img: img3, title: "Content", component: Content },
    { id: 3, img: img4, title: "Images", component: ImagesSection },
    { id: 4, img: img5, title: "People", component: People },
    { id: 5, img: img6, title: "Text", component: Text },
    { id: 6, img: img7, title: "Contact & Forms", component: ContactSection },
    { id: 7, img: img8, title: "Social", component: SocialMedia },
]
