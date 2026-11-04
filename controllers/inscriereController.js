import { salveazaInscriere } from "../services/inscriereService.js";

export async function creareInscriere (req, res) {
    try {
        const id = await salveazaInscriere(req.body);
        return res.status(201).json({
        ok: true,
        mesaj: "Inscriere realizata cu succes!",
        id
    });
    
    } catch (eroare) {
        if(eroare.status === 400) {
            return res.status(400).json({
                eroare: eroare.message
            });
        }
        console.error(eroare);
        
        return res.status(500).json({
            eroare: "Eroare la salvarea inscrierii."
        });
    }
}