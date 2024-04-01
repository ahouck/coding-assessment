import React, { useRef, MutableRefObject } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Note } from "../../models/Note";
import { Button, message } from "antd";

export const NotesEditor = ({
  note,
  onSave,
}: {
  note?: Note;
  onSave: (
    id: string | undefined,
    plainText: string,
    renderedText: string
  ) => boolean;
}) => {
  const editorRef: MutableRefObject<Editor | null> = useRef<Editor>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const saveMessage = () => {
    let error = undefined;
    if (editorRef.current) {
      //@ts-ignore
      const count = editorRef?.current?.plugins.wordcount.body.getCharacterCount();
      if (count < 20) {
        error = `Notes require a minimum of 20 characters`;
      }
      if (count > 300) {
        error = `Note exceeds the 300 max character count `;
      }
    } else {
      error = `Notes application failed to load, please refresh the page`;
    }

    if (error) {
      message.open({ type: "error", content: error });
    } else {
      //@ts-ignore
      onSave( note?.id, editorRef.current.getContent({ format: "text" }), editorRef.current.getContent());
      message.open({ type: "success", content: "Note successfully saved" });
    }
  };

  return (
    <div className="notesEditorContainer">
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => {
          (editorRef.current as unknown) = editor;
        }}
        initialValue={note ? note.plainText : "...type your note here..."}
        init={{
          height: 500,
          menubar: false,
          // setup(editor) {
          // editor.on("keyup", (event) => {
          //@ts-ignore
          // var numChars = editorRef?.current?.plugins.wordcount.body.getCharacterCount();
          // });

          // },
          branding: false,
          promotion: false,
          plugins:
            "advlist autolink lists link image charmap print preview anchor insertdatetime media table paste code help wordcount visualchars",
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <Button type="primary" onClick={saveMessage}>
        Save
      </Button>
    </div>
  );
};
