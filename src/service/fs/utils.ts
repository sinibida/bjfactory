import fs from 'fs/promises'

// weird that this is the only way.
/**
 * See if the folder is accessible with provided access mode.
 * 
 * When mode is undefined, it simply checks whether the folder exists or not.
 * @param path 
 * @param mode 
 * @returns 
 */
export async function isAccessible(
  path: string,
  mode?: number
) {
  try {
    await fs.access(path, mode);
    return true;
  } catch {
    return false;
  }
}