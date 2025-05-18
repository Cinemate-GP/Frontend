export interface User {
  id?: string;
  userName: string;
  fullName: string;
  email: string;
  profilePic?: string;
  bio?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  
}

export interface ProfileEditorProps {
  modal?: boolean;
  onClose?: () => void;
}

export interface ImageEditorState {
  scale: number;
  position: { x: number; y: number };
  originalImageDimensions: { width: number; height: number } | null;
}