import React, { useState, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// 元素类型定义
const ItemTypes = {
  COMPONENT: "component",
  CANVAS_ELEMENT: "canvas_element",
};

// 组件面板
const ComponentPanel = () => {
  return (
    <div className="component-panel">
      <h3>组件库</h3>
      <div className="components">
        <DraggableComponent type="text" label="文本组件" icon="T" />
        <DraggableComponent type="image" label="图片组件" icon="🖼️" />
        <DraggableComponent type="button" label="按钮组件" icon="🔘" />
        <DraggableComponent type="container" label="容器组件" icon="📦" />
      </div>
    </div>
  );
};

// 可拖拽组件
const DraggableComponent = ({ type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { type, label, icon },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="component-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      title={label}
    >
      <span className="component-icon">{icon}</span>
      {label}
    </div>
  );
};

// 画布区域
const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const canvasRef = useRef(null);

  // 添加新元素
  const addElement = (item, position) => {
    const newElement = {
      id: Date.now().toString(),
      type: item.type,
      content:
        item.type === "text"
          ? "双击编辑文本"
          : item.type === "button"
          ? "按钮"
          : item.type === "container"
          ? "容器"
          : "https://via.placeholder.com/150?text=图片",
      style: {
        position: "absolute",
        left: position.x - 50,
        top: position.y - 25,
        width: item.type === "container" ? 300 : 100,
        height: item.type === "container" ? 200 : 50,
        backgroundColor:
          item.type === "text"
            ? "#f0f8ff"
            : item.type === "button"
            ? "#4CAF50"
            : item.type === "container"
            ? "#e6f7ff"
            : "transparent",
        color: "#333",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        border: item.type === "container" ? "2px dashed #1890ff" : "none",
        overflow: "hidden",
        zIndex: elements.length + 1,
      },
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  // 处理画布放置
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item, monitor) => {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      const position = {
        x: clientOffset.x - canvasRect.left,
        y: clientOffset.y - canvasRect.top,
      };

      addElement(item, position);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // 选择元素
  const selectElement = (element) => {
    setSelectedElement(element);
  };

  // 更新元素
  const updateElement = (id, updates) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  // 删除元素
  const deleteElement = (id) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
    }
  };

  // 调整层级
  const changeZIndex = (id, direction) => {
    const elementIndex = elements.findIndex((el) => el.id === id);
    if (direction === "up" && elementIndex < elements.length - 1) {
      const newElements = [...elements];
      [newElements[elementIndex], newElements[elementIndex + 1]] = [
        newElements[elementIndex + 1],
        newElements[elementIndex],
      ];

      newElements.forEach((el, index) => {
        el.style.zIndex = index + 1;
      });

      setElements(newElements);
    } else if (direction === "down" && elementIndex > 0) {
      const newElements = [...elements];
      [newElements[elementIndex], newElements[elementIndex - 1]] = [
        newElements[elementIndex - 1],
        newElements[elementIndex],
      ];

      newElements.forEach((el, index) => {
        el.style.zIndex = index + 1;
      });

      setElements(newElements);
    }
  };

  // 双击编辑文本
  const handleDoubleClick = (e, element) => {
    if (element.type === "text") {
      const newText = prompt("编辑文本内容:", element.content);
      if (newText !== null) {
        updateElement(element.id, { content: newText });
      }
    }
  };

  return (
    <div className="canvas-container">
      <div
        ref={drop}
        className="canvas"
        style={{ border: isOver ? "2px dashed #1890ff" : "1px solid #ddd" }}
        ref={canvasRef}
      >
        {elements.map((element) => (
          <CanvasElement
            key={element.id}
            element={element}
            isSelected={selectedElement?.id === element.id}
            onSelect={selectElement}
            onDoubleClick={handleDoubleClick}
            onDelete={deleteElement}
            onChangeZIndex={changeZIndex}
          />
        ))}
      </div>

      <div className="canvas-overlay">
        {selectedElement && (
          <div className="element-info">
            选中: {selectedElement.type} (ID: {selectedElement.id})
          </div>
        )}
      </div>
    </div>
  );
};

// 画布上的元素
const CanvasElement = ({
  element,
  isSelected,
  onSelect,
  onDoubleClick,
  onDelete,
  onChangeZIndex,
}) => {
  const ref = useRef(null);

  // 元素拖拽
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CANVAS_ELEMENT,
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // 元素放置
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CANVAS_ELEMENT,
    drop: () => ({
      moveElement: true,
      id: element.id,
    }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drag(drop(ref));

  // 使元素可拖动
  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      let isDragging = false;
      let startX, startY, initialLeft, initialTop;

      const handleMouseDown = (e) => {
        // 忽略右键和文本选择
        if (e.button !== 0) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseInt(element.style.left) || 0;
        initialTop = parseInt(element.style.top) || 0;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      };

      const handleMouseMove = (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // 直接更新样式，实际项目中应通过状态更新
        el.style.left = `${initialLeft + dx}px`;
        el.style.top = `${initialTop + dy}px`;
      };

      const handleMouseUp = () => {
        if (isDragging) {
          isDragging = false;
          const newLeft = parseInt(el.style.left);
          const newTop = parseInt(el.style.top);

          // 更新状态
          onSelect({
            ...element,
            style: {
              ...element.style,
              left: newLeft,
              top: newTop,
            },
          });
        }

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      el.addEventListener("mousedown", handleMouseDown);

      return () => {
        el.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [element, onSelect]);

  return (
    <div
      ref={ref}
      className={`canvas-element ${isSelected ? "selected" : ""}`}
      style={{
        ...element.style,
        cursor: "move",
        opacity: isDragging ? 0.7 : 1,
        boxShadow: isSelected
          ? "0 0 0 2px #1890ff, 0 0 0 4px rgba(24, 144, 255, 0.3)"
          : "none",
        transform: isOver ? "scale(1.05)" : "none",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element);
      }}
      onDoubleClick={(e) => onDoubleClick(e, element)}
    >
      {element.type === "text" && (
        <div className="element-content">{element.content}</div>
      )}

      {element.type === "image" && (
        <img
          src={element.content}
          alt="placeholder"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {element.type === "button" && (
        <button className="element-button">{element.content}</button>
      )}

      {element.type === "container" && (
        <div className="container-placeholder">
          <div className="container-hint">容器区域</div>
        </div>
      )}

      {isSelected && (
        <div className="element-controls">
          <button
            className="control-btn up"
            onClick={(e) => {
              e.stopPropagation();
              onChangeZIndex(element.id, "up");
            }}
            title="上移一层"
          >
            ⇧
          </button>
          <button
            className="control-btn down"
            onClick={(e) => {
              e.stopPropagation();
              onChangeZIndex(element.id, "down");
            }}
            title="下移一层"
          >
            ⇩
          </button>
          <button
            className="control-btn delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
            title="删除元素"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

// 属性编辑器
const PropertiesPanel = ({ selectedElement, onUpdate }) => {
  if (!selectedElement) {
    return (
      <div className="properties-panel empty">
        <h3>属性编辑器</h3>
        <p>请在画布上选择一个元素进行编辑</p>
      </div>
    );
  }

  const handleChange = (property, value) => {
    if (property === "content") {
      onUpdate({ content: value });
    } else if (property.startsWith("style.")) {
      const styleProp = property.split(".")[1];
      onUpdate({
        style: {
          ...selectedElement.style,
          [styleProp]: value,
        },
      });
    }
  };

  return (
    <div className="properties-panel">
      <h3>属性: {selectedElement.type}</h3>
      <div className="property-group">
        <label>内容</label>
        <input
          type="text"
          value={selectedElement.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </div>

      <div className="property-group">
        <label>宽度 (px)</label>
        <input
          type="number"
          value={selectedElement.style.width}
          onChange={(e) =>
            handleChange("style.width", parseInt(e.target.value))
          }
        />
      </div>

      <div className="property-group">
        <label>高度 (px)</label>
        <input
          type="number"
          value={selectedElement.style.height}
          onChange={(e) =>
            handleChange("style.height", parseInt(e.target.value))
          }
        />
      </div>

      <div className="property-group">
        <label>背景色</label>
        <input
          type="color"
          value={selectedElement.style.backgroundColor || "#ffffff"}
          onChange={(e) =>
            handleChange("style.backgroundColor", e.target.value)
          }
        />
      </div>

      {selectedElement.type === "text" && (
        <div className="property-group">
          <label>文字颜色</label>
          <input
            type="color"
            value={selectedElement.style.color || "#000000"}
            onChange={(e) => handleChange("style.color", e.target.value)}
          />
        </div>
      )}

      <div className="property-group">
        <label>边框半径 (px)</label>
        <input
          type="number"
          value={parseInt(selectedElement.style.borderRadius) || 0}
          onChange={(e) =>
            handleChange("style.borderRadius", `${e.target.value}px`)
          }
        />
      </div>
    </div>
  );
};

// 层级管理器
const LayersPanel = ({
  elements,
  onSelect,
  onDelete,
  onChangeZIndex,
  selectedElement,
}) => {
  return (
    <div className="layers-panel">
      <h3>元素层级</h3>
      <div className="layers-list">
        {elements.length === 0 ? (
          <p className="empty-state">画布上没有元素</p>
        ) : (
          [...elements].reverse().map((element) => (
            <div
              key={element.id}
              className={`layer-item ${
                selectedElement?.id === element.id ? "selected" : ""
              }`}
              onClick={() => onSelect(element)}
            >
              <div className="layer-info">
                <span className="layer-type">
                  {getIconForType(element.type)}
                </span>
                <span className="layer-name">
                  {element.type} • {element.content?.substring(0, 10)}
                  {element.content?.length > 10 ? "..." : ""}
                </span>
              </div>
              <div className="layer-controls">
                <button
                  className="layer-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeZIndex(element.id, "up");
                  }}
                  title="上移"
                >
                  ⇧
                </button>
                <button
                  className="layer-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeZIndex(element.id, "down");
                  }}
                  title="下移"
                >
                  ⇩
                </button>
                <button
                  className="layer-btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(element.id);
                  }}
                  title="删除"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const getIconForType = (type) => {
  switch (type) {
    case "text":
      return "T";
    case "image":
      return "🖼️";
    case "button":
      return "🔘";
    case "container":
      return "📦";
    default:
      return "▢";
  }
};

// JSON数据展示
const JsonPanel = ({ elements }) => {
  return (
    <div className="json-panel">
      <h3>页面数据 (JSON)</h3>
      <pre className="json-output">{JSON.stringify({ elements }, null, 2)}</pre>
    </div>
  );
};

// 主应用
const Design = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  // 更新元素
  const updateElement = (id, updates) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  // 选择元素
  const selectElement = (element) => {
    setSelectedElement(element);
  };

  // 删除元素
  const deleteElement = (id) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
    }
  };

  // 调整层级
  const changeZIndex = (id, direction) => {
    const elementIndex = elements.findIndex((el) => el.id === id);
    const newElements = [...elements];

    if (direction === "up" && elementIndex < elements.length - 1) {
      [newElements[elementIndex], newElements[elementIndex + 1]] = [
        newElements[elementIndex + 1],
        newElements[elementIndex],
      ];
    } else if (direction === "down" && elementIndex > 0) {
      [newElements[elementIndex], newElements[elementIndex - 1]] = [
        newElements[elementIndex - 1],
        newElements[elementIndex],
      ];
    }

    // 重新计算z-index
    newElements.forEach((el, index) => {
      el.style.zIndex = index + 1;
    });

    setElements(newElements);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <header className="app-header">
          <h1>拖拽设计工具 - 基础演示</h1>
          <p>从左侧拖拽组件到画布，编辑属性，管理层级，查看JSON数据结构</p>
        </header>

        <div className="main-layout">
          <ComponentPanel />

          <div className="canvas-area">
            <Canvas
              elements={elements}
              setElements={setElements}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
            />
          </div>

          <div className="right-panel">
            <PropertiesPanel
              selectedElement={selectedElement}
              onUpdate={(updates) =>
                selectedElement && updateElement(selectedElement.id, updates)
              }
            />

            <LayersPanel
              elements={elements}
              onSelect={selectElement}
              onDelete={deleteElement}
              onChangeZIndex={changeZIndex}
              selectedElement={selectedElement}
            />
          </div>
        </div>

        <JsonPanel elements={elements} />
      </div>
    </DndProvider>
  );
};

export default Design