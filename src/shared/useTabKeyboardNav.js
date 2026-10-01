/**
 * Owner: Shared
 * Purpose: Roving-tabindex keyboard behaviour for ARIA tablist groups, per the
 * WAI-ARIA Authoring Practices tabs pattern — Left/Right move and activate,
 * wrapping at the ends; Home/End jump to the first/last tab.
 */
import { useRef } from 'react';
 
export function useTabKeyboardNav(tabCount, onActivate) {
  const tabRefs = useRef([]);
  tabRefs.current = tabRefs.current.slice(0, tabCount);
 
  const registerTab = (index) => (el) => {
    tabRefs.current[index] = el;
  };
 
  const focusTab = (index) => {
    tabRefs.current[index]?.focus();
  };
 
  const handleKeyDown = (event, index) => {
    let nextIndex;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabCount;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabCount) % tabCount;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabCount - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    onActivate(nextIndex);
    focusTab(nextIndex);
  };
 
  return { registerTab, handleKeyDown };
}
