/* @layer renderer-components @kind hook */
import { useWheelListener } from '../../../primitives/dom/useWheelListener';
import type { NavigatorWheelInput } from './useNavigatorWheel.type';

const useNavigatorWheel = (input: NavigatorWheelInput): void => {
  const { mapRef, surface, onWheelZoom } = input;
  useWheelListener(mapRef, onWheelZoom && ((event) => {
    const map = mapRef.current;
    if (!map || event.deltaY === 0) return;
    event.preventDefault();
    const box = map.getBoundingClientRect();
    const across = box.width > 0 ? (event.clientX - box.left) / box.width : 0;
    const down = box.height > 0 ? (event.clientY - box.top) / box.height : 0;
    onWheelZoom(event.deltaY < 0 ? 1 : -1, { x: across * surface.width, y: down * surface.height });
  }));
};

export { useNavigatorWheel };
