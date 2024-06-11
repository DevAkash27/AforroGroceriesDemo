import api from '../Service';
import {API_END_POINT} from '../constants/strings';
const getPosts = params => {
  return api.get(API_END_POINT.fetchPosts);
};

const HomeServices = {getPosts};
export default HomeServices;
