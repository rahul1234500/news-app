import neswImg from "../image/news.svg";
const NewsItem = ({ title, description, src, url }) => {
  return (
    <div
      className="card bg-dark text-light h-100"
      style={{
        borderRadius: "8px",
        border: "1px solid #444",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
      }}
    >
        <img src={src ? src : neswImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url} className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    );
  };

export default NewsItem;
