import React, { useEffect, useState } from "react";

const ForthView = () => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  // All document field keys
  const imageFields = [
    "pp_photo", "par_sign", "stu_dom", "fam_reg", "rat_car",
    "san_pra", "bir_pra", "inc_cer", "stu_adhar", "tik_cer",
    "fam_pas", "hou_tax", "stu_pan", "aww_doc", "cas_cer",
    "old_ben", "fur_edu"
  ];

  // Friendly labels for each field
  const fieldLabels = {
    pp_photo: "पासपोर्ट फोटो",
    par_sign: "अभिभावक के हस्ताक्षर",
    stu_dom: "छात्र निवास प्रमाण पत्र",
    fam_reg: "परिवार पंजीकरण प्रमाण पत्र",
    rat_car: "राशन कार्ड",
    san_pra: "स्वच्छता प्रमाण पत्र",
    bir_pra: "जन्म प्रमाण पत्र",
    inc_cer: "आय प्रमाण पत्र",
    stu_adhar: "छात्र का आधार कार्ड",
    tik_cer: "जाति प्रमाण पत्र",
    fam_pas: "परिवार का पासपोर्ट",
    hou_tax: "मकान कर रसीद",
    stu_pan: "छात्र का पैन कार्ड",
    aww_doc: "आंगनवाड़ी दस्तावेज़",
    cas_cer: "जाति प्रमाण पत्र",
    old_ben: "वृद्धावस्था पेंशन लाभ प्रमाण",
    fur_edu: "उच्च शिक्षा प्रमाण पत्र"
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      console.error("user_id not found in localStorage");
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      try {
        const response = await fetch(`https://brjobsedu.com/Nandagora/api2/phase4/update/${user_id}`);
        if (!response.ok) throw new Error("Failed to fetch image data");

        const data = await response.json();
        const filteredImages = {};

        imageFields.forEach((field) => {
          if (data[field]) {
            let path = data[field];
            if (path.startsWith("/http/")) {
              filteredImages[field] = path;
            } else {
              path = path.replace(/^\/+/, "");
              filteredImages[field] = `https://brjobsedu.com/Nandagora/${path}`;
            }
          }
        });

        setImages(filteredImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading images...</p>;

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
        <thead className="nd-born-thead">
          <tr>
            <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>
              दस्तावेज़ नाम
            </th>
            <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>
              स्थिति
            </th>
            <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>
              पूर्वावलोकन
            </th>
          </tr>
        </thead>
        <tbody>
          {imageFields.map((field) => (
            <tr key={field}>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                {fieldLabels[field] || field.replace(/_/g, " ").toUpperCase()}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                {images[field] ? (
                  <span style={{ color: "green", fontWeight: "bold"  }}>✓ सफलतापूर्वक अपलोड हुआ</span>
                ) : (
                  <span style={{ color: "gray" }}>फ़ाइल अपलोड नहीं की गई</span>
                )}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                {images[field] ? (
                  <img
                    src={images[field]}
                    alt={field}
                    style={{
                      width: "180px",
                      border: "1px solid #ccc",
                      borderRadius: "4px"
                    }}
                  />
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForthView;
