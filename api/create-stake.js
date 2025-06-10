const { Xumm } = require('xumm-sdk');
const xumm = new Xumm(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);

module.exports = async (req, res) => {
  try {
    const payload = {
      txjson: {
        TransactionType: 'Payment',
        Destination: 'rJd5h5PqSh7Y3gPkAYDrQUDTSukfKRVBNV',
        Amount: {
          currency: 'WDM',
          issuer: 'rphmS6GfDCgoR5jjqSTJ4dUvahm1TNPeY1',
          value: '100'
        },
        Memos: [
          {
            Memo: {
              MemoData: Buffer.from('WDM_Beta_Access').toString('hex')
            }
          }
        ]
      }
    };

    const created = await xumm.payload.create(payload);
    res.status(200).json({
      next: created?.next?.always || null,
      refs: created?.refs || null,
      uuid: created?.uuid || null
    });
  } catch (e) {
    console.error("Fatal XUMM SDK Error:", e.message);
    res.status(500).json({ error: "XUMM SDK failed to create payload.", detail: e.message });
  }
};