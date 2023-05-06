import { Adventure } from './Adventure';
import { Portrait } from './Portrait';

export interface Assets {
  adventures: Adventure[];
  portraits: Portrait[];
  poses: string[];
}
