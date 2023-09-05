const journalM = require('../../models/journal');



exports.getAllJournal = async (req, res) => {
    try {
        const userID = req.user._id;
        const journals = await journalM.find({ createdBy: userID }).populate("createdBy", "name email");
        res.status(200).json({ message: "Fetched", data: journals });

    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

exports.getJournal = async (req, res) => {
    try {
        const userID = req.user._id;
        const id = req.params.id;
        const journal = await journalM.findOne({ createdBy: userID, _id: id }).populate("createdBy", "name email");
        if (!journal) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.status(200).json({ message: "Fetched", data: journal });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

exports.createJournal = async (req, res) => {
    try {
        const { title, entry } = req.body;
        const userId = req.user._id;
        if (!entry || entry.trim().length === 0) {
            const err = new Error("Entry Can Not Be Empty");
            err.statusCode = 422;
            throw err;
        }
        const newJournal = new journalM({
            entry,
            title,
            createdBy: userId,
        })
        await newJournal.save();
        res.status(201).json({ message: "New Journal Created" });

    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

exports.updateJournal = async (req, res) => {
    try {
        const userID = req.user._id;
        const { title, entry } = req.body;
        const id = req.params.id;
        if (!id) {
            const err = new Error("Please Enter ID");
            err.statusCode = 422;
            throw err;
        }
        const journal = await journalM.findOne({ _id: id, createdBy: userID });
        journal.title = title;
        journal.entry = entry;
        await journal.save();
        res.status(201).json({ message: "Journal Updated" });
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

exports.deleteJournal = async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.user._id;
        await journalM.findOneAndDelete({ _id: id, createdBy: userID });
        res.status(200).json({ message: "Journal Deleted" })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}