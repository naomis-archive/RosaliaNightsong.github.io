import { Adventure } from './Adventure';
import { Portrait } from './Portrait';
import { Pose } from './Pose';

export interface Assets {
  adventures: Adventure[];
  portraits: Portrait[];
  poses: Pose[];
}
