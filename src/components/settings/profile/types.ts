export interface User {
  id?: string;
  fullName: string;
  email: string;
  profilePic?: string;
  bio?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
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