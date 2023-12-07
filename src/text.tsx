import { useState, useRef } from "react";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import { OrdiNFTP2PKH } from "scrypt-ord";
import { Addr, PandaSigner, toByteString } from "scrypt-ts";
import { Navigate } from "react-router-dom";

function TEXT(props) {
  const { _ordiAddress, _signer } = props;
  const connected = () => _ordiAddress !== undefined;
  const [result, setResult] = useState<string | undefined>(undefined);

  const mint = async () => {
    try {
      const signer = _signer as PandaSigner;

      const value = text.current?.value;
      if (value !== undefined) {
        const instance = new OrdiNFTP2PKH(Addr(_ordiAddress!.toByteString()));
        console.log("value :", value);
        await instance.connect(signer);
        const inscriptionTx = await instance.inscribeText(toByteString(value,true));
        setResult(`Text Inscription ID: ${inscriptionTx.id}`);
      } else {
        setResult("Error: Input value is undefined");
      }
    } catch (e) {
      console.error("Error:", e);
      setResult(`Error: ${e}`);
    }
  };

  const text: React.RefObject<HTMLInputElement> = useRef(null);

  return (
    <Container maxWidth="md">
      {!connected() && <Navigate to="/" />}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Inscribe TEXT
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <TextField inputRef={text} label="Text" variant="outlined" fullWidth />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={!connected()}
          onClick={mint}>
          Inscribe It!
        </Button>
      </Box>
      {result && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">{result}</Typography>
        </Box>
      )}
    </Container>
  );
}

export default TEXT;
