import { useState, useEffect } from "react";


function Image() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images")) || [];
    setImages(storedImages);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("images", JSON.stringify(images));
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded. Unable to save images.");
      }
    }
  }, [images]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: Date.now(),
          src: reader.result,
          title,
          tags: tags.split(",").map(tag => tag.trim()),
        };
        setImages(prevImages => [newImage, ...prevImages]);
        setTitle("");
        setTags("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (id) => {
    setImages(prevImages => prevImages.filter(img => img.id !== id));
  };

  const filteredImages = selectedTag === "All" ? images : images.filter(img => img.tags.includes(selectedTag));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enter Details of Event And Upload Images</h1>
      <div className="mb-4">
        <input type="text" placeholder="Event_Type" value={tags} onChange={(e) => setTags(e.target.value)} className="border p-2 mr-2" />
        <input type="file" onChange={handleImageUpload} className="border p-2" />
      </div>
      <div className="mb-4">
        <label className="mr-2">Event_List:</label>
        <select onChange={(e) => setSelectedTag(e.target.value)} className="border p-2">
          <option>All</option>
          {[...new Set(images.flatMap(img => img.tags))].map(tag => (
            <option key={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredImages.map(img => (
          <div key={img.id} className="border p-2 rounded relative">
            <button 
              onClick={() => handleDeleteImage(img.id)} 
              className="absolute top-1 right-1 bg-red-500 text-white p-1 text-xs rounded"
            >
              REMOVE
            </button>
            <img src={img.src} alt={img.title} className="w-50 h-50 object-cover" />
            <p className="text-lg font-semibold mt-2">{img.tags.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Image;
