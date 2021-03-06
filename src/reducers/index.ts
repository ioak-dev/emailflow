import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import UserReducer from './UserReducer';
import SpaceReducer from './SpaceReducer';
import ProjectReducer from './ProjectReducer';
import DomainReducer from './DomainReducer';
import CustomEndpointReducer from './CustomEndpointReducer';
import TemplateReducer from './TemplateReducer';
import EmailServerReducer from './EmailServerReducer';
import ApiKeyReducer from './ApiKeyReducer';

export default combineReducers({
  authorization: AuthReducer,
  profile: ProfileReducer,
  user: UserReducer,
  space: SpaceReducer,
  project: ProjectReducer,
  domain: DomainReducer,
  customEndpoint: CustomEndpointReducer,
  template: TemplateReducer,
  emailServer: EmailServerReducer,
  apiKey: ApiKeyReducer,
});
